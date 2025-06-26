"""
URL configuration for ewaste_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core.views import unassigned_requests, list_recyclers, assign_recycler, admin_stats

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/auth/', include('authentication.urls')),
    path('api/admin/unassigned-requests/', unassigned_requests),
    path('api/admin/recyclers/', list_recyclers),
    path('api/admin/assign-recycler/', assign_recycler),
    path('api/admin/stats/', admin_stats),  
]