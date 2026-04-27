from django.urls import path
from .views import (
    CustomUserListCreateAPIView,
    CustomUserRetrieveUpdateDestroyAPIView,
    CustomTokenView
)

urlpatterns = [
    path("api/custom_user/list_create_view",CustomUserListCreateAPIView.as_view()),
    path("api/custom_user/retrieve_update/<int:pk>/", CustomUserRetrieveUpdateDestroyAPIView.as_view()),
    
    path('token/', CustomTokenView.as_view())
]