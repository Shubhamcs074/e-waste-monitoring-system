from rest_framework import viewsets, permissions, status, generics
from .models import Device, PickupRequest, User
from .serializers import DeviceSerializer, PickupRequestSerializer, UserSerializer
from rest_framework.decorators import action, api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView

User = get_user_model()

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff

class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Device.objects.all()
        return Device.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PickupRequestViewSet(viewsets.ModelViewSet):
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'assigned_recycler', 'user']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return PickupRequest.objects.all()
        elif hasattr(user, 'userprofile') and user.userprofile.role == 'recycler':
            return PickupRequest.objects.filter(assigned_recycler=user)
        return PickupRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        pickup = self.get_object()
        if pickup.assigned_recycler_id != request.user.id:
            return Response({"detail": "You are not assigned to this request."}, status=403)

        status_val = request.data.get("status")
        if status_val not in ["approved", "completed"]:
            return Response({"error": "Invalid status"}, status=400)

        pickup.status = status_val
        pickup.save()

        if status_val == "completed":
            pickup.device.status = "obsolete"
            pickup.device.save()
        return Response({"message": "Pickup request status updated successfully."})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def recycler_stats(self, request):
        user = request.user
        if not hasattr(user, 'userprofile') or user.userprofile.role != 'recycler':
            return Response({"error": "You are not a recycler"}, status=403)

        assigned = PickupRequest.objects.filter(assigned_recycler=user).count()
        approved = PickupRequest.objects.filter(assigned_recycler=user, status='approved').count()
        completed = PickupRequest.objects.filter(assigned_recycler=user, status='completed').count()

        return Response({
           "assigned_requests": assigned,
           "approved": approved,
           "completed": completed
        })

class UserDevicesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        devices = Device.objects.filter(user=request.user)
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DeviceSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            device = serializer.save()
            return Response(DeviceSerializer(device).data, status=201)
        return Response(serializer.errors, status=400)

class DeviceCreateAPIView(generics.CreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PickupRequestListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return PickupRequest.objects.filter(user=self.request.user)

class AssignedPickupRequestsAPIView(generics.ListAPIView):
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PickupRequest.objects.filter(assigned_recycler=self.request.user)

class UpdatePickupStatusAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            pickup = PickupRequest.objects.get(id=pk, assigned_recycler=request.user)
            new_status = request.data.get('status')
            if new_status in ['picked', 'recycled']:
                pickup.status = new_status
                pickup.save()
                return Response({'status': 'updated'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        except PickupRequest.DoesNotExist:
            return Response({'error': 'Pickup request not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            request_obj = PickupRequest.objects.get(id=pk, assigned_recycler=request.user)
            status_val = request.data.get('status')
            if status_val not in ['pending', 'in-progress', 'completed']:
                return Response({"error": "Invalid status"}, status=400)
            request_obj.status = status_val
            request_obj.save()
            return Response({"message": "Status updated successfully"})
        except PickupRequest.DoesNotExist:
            return Response({"error": "Request not found or not assigned to you"}, status=404)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def unassigned_requests(request):
    requests = PickupRequest.objects.filter(status='pending', assigned_recycler__isnull=True)
    serializer = PickupRequestSerializer(requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_recyclers(request):
    recyclers = User.objects.filter(userprofile__role='recycler')
    serializer = UserSerializer(recyclers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def assign_recycler(request):
    request_id = request.data.get('request_id')
    recycler_id = request.data.get('recycler_id')

    try:
        pickup_request = PickupRequest.objects.get(id=request_id)
        recycler = User.objects.get(id=recycler_id, userprofile__role='recycler')
        pickup_request.assigned_recycler = recycler
        pickup_request.status = 'assigned'
        pickup_request.save()
        return Response({'success': 'Recycler assigned successfully.'})
    except PickupRequest.DoesNotExist:
        return Response({'error': 'Pickup request not found.'}, status=404)
    except User.DoesNotExist:
        return Response({'error': 'Recycler not found.'}, status=404)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_stats(request):
    total_users = User.objects.count()
    total_recyclers = User.objects.filter(userprofile__role='recycler').count()
    total_requests = PickupRequest.objects.count()
    pending_requests = PickupRequest.objects.filter(status='pending').count()
    assigned_requests = PickupRequest.objects.filter(status='assigned').count()
    completed_requests = PickupRequest.objects.filter(status='completed').count()

    return Response({
        'total_users': total_users,
        'total_recyclers': total_recyclers,
        'total_requests': total_requests,
        'pending_requests': pending_requests,
        'assigned_requests': assigned_requests,
        'completed_requests': completed_requests,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_request_status(request):
    try:
        request_id = request.data.get('request_id')
        new_status = request.data.get('status')

        if not request_id or not new_status:
            return Response({'error': 'Missing data'}, status=status.HTTP_400_BAD_REQUEST)

        pickup_request = PickupRequest.objects.get(id=request_id, assigned_recycler=request.user)
        pickup_request.status = new_status
        pickup_request.save()

        return Response({'message': 'Status updated successfully'})
    
    except PickupRequest.DoesNotExist:
        return Response({'error': 'Request not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)