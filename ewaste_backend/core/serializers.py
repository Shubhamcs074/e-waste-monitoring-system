from rest_framework import serializers
from .models import UserProfile, User
from .models import Device, PickupRequest
from django.contrib.auth import get_user_model
    
User = get_user_model()

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'status']
        read_only_fields = ['id']

    def create(self, validated_data):
        user = self.context['request'].user
        return Device.objects.create(user=user, **validated_data)

class PickupRequestSerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(source='device.name', read_only=True)
    pickup_location = serializers.CharField(source='device.location', read_only=True)
    pickup_date = serializers.DateField(format="%Y-%m-%d", required=False, allow_null=True)


    class Meta:
        model = PickupRequest
        fields = ['id', 'device', 'device_name', 'pickup_date','status', 'requested_at', 'assigned_recycler', 'pickup_location']
        read_only_fields = ['id', 'requested_at']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['role', 'location', 'status']

class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'userprofile']