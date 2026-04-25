from django.urls import path
from .views import (
    ActionListCreateAPIView, 
    ActionRetrieveUpdateDestroyAPIView,
    AddressListCreateAPIView,
    AddressRetrieveUpdateDestroyAPIView,
                    )
urlpatterns = [
    path('api/action/list_create_view',ActionListCreateAPIView.as_view()),
    path('api/action/retrive_update_delete',ActionRetrieveUpdateDestroyAPIView.as_view()),
    path('api/address/list_create_view',AddressListCreateAPIView.as_view()),
    path('api/address/retrive_update_delete',AddressRetrieveUpdateDestroyAPIView.as_view())
]