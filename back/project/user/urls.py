from django.urls import path
from .views import (
    CustomUserListCreateAPIView,
    CustomUserRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path("api/custom_user/list_create_view",CustomUserListCreateAPIView.as_view()),
    path("api/custom_user/retrieve_update", CustomUserRetrieveUpdateDestroyAPIView.as_view())
]