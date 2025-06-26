from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authentication.views import RegisterView
from core.views import (
    DeviceViewSet, PickupRequestViewSet, UserDevicesView,
    PickupRequestListCreateAPIView, AssignedPickupRequestsAPIView,
    UpdatePickupStatusAPIView, 
    unassigned_requests, list_recyclers, assign_recycler, admin_stats
)

router = DefaultRouter()
router.register(r'devices', DeviceViewSet, basename='device')
router.register(r'pickup-requests', PickupRequestViewSet, basename='pickuprequest')

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    
    # Router views
    path('', include(router.urls)),

    # User routes
    path('user/devices/', UserDevicesView.as_view(), name='user_devices'),
    path('user/requests/', PickupRequestListCreateAPIView.as_view(), name='pickup-request-list-create'),

    # Recycler routes
    path('recycler/assigned-requests/', AssignedPickupRequestsAPIView.as_view(), name='recycler-assigned-requests'),
    path('recycler/update-status/<int:pk>/', UpdatePickupStatusAPIView.as_view(), name='update-pickup-status'),

    # Admin routes (one per feature)
    path('admin/recyclers/', list_recyclers, name='admin-recyclers'),
    path('admin/unassigned-requests/', unassigned_requests, name='unassigned-requests'),
    path('admin/assign-recycler/', assign_recycler, name='assign-recycler'),
    path('admin/stats/', admin_stats, name='admin-stats'),
]
 