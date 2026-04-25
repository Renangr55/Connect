"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),
    
    # views
    path('', include('action.urls')),
    path('', include('institution.urls')),
    path('', include('skills.urls')),
    path('',include('subscription.urls')),
    path('',include('user.urls')),
    path('', include('volunteer.urls')),
    path('',include('notification.urls')),
    
    #auth
    path('api/token/token_obtain',TokenObtainPairView.as_view(), name="token_obtain_pairview"),
    path('api/token/token_refresh',TokenRefreshView.as_view(), name="token_refresh")
    
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
