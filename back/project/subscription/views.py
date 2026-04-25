from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Subscription
from rest_framework.permissions import IsAuthenticated
from .serializers import SubscriptionSerializer

# subscription
class SubscriptionListCreateAPIView(ListCreateAPIView):
    queryset = Subscription.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionSerializer

    
class SubscriptionRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionSerializer
