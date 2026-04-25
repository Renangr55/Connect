from django.urls import path
from .views import (
    SubscriptionListCreateAPIView,
    SubscriptionRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path("api/subscription/list_create_view",SubscriptionListCreateAPIView.as_view()),
    path("api/subscription/retrive_update_delete",SubscriptionRetrieveUpdateDestroyAPIView.as_view())
]