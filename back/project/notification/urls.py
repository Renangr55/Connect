from django.urls import path
from .views import (
    NotificationListCreateAPIView,
    NotificationRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path("api/notification/list_create_view",NotificationListCreateAPIView.as_view()),
    path("api/notification/retrive_update_delete/<int:pk>/",NotificationRetrieveUpdateDestroyAPIView.as_view())
]