from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Notification
from rest_framework.permissions import IsAuthenticated
from .serializers import NotificationSerializer

# subscription
class NotificationListCreateAPIView(ListCreateAPIView):
    queryset = Notification.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    
class NotificationRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
