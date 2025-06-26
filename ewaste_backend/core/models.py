from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.conf import settings


class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('recycler', 'Recycler'),
        ('admin', 'Admin'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=(('user', 'User'), ('recycler', 'Recycler'), ('admin', 'Admin')))
    status = models.CharField(max_length=20, default='Pending')
    location = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} ({self.role})"
    
User = get_user_model()

class Device(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('obsolete', 'Obsolete'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='devices')
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255, blank=True, null=True)
    brand = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100, unique=True, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    

    def __str__(self):
        return f"{self.name} ({self.status})"

class PickupRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    assigned_recycler = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_requests'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    requested_at = models.DateTimeField(auto_now_add=True)
    pickup_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Request for {self.device.name} by {self.user.username}"
