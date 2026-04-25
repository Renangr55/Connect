from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer

# Custom user
class CustomUserListCreateAPIView(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    
class CustomUserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
