from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Volunteer,Avaliability
from rest_framework.permissions import IsAuthenticated
from .serializers import VolunteerSerializer,AvaliabilitySerializer

# Volunteer
class VolunteerListCreateAPIView(ListCreateAPIView):
    queryset = Volunteer.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = VolunteerSerializer

    
class VolunteerRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = VolunteerSerializer

# Avaliability
class AvaliabilityRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Avaliability.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = AvaliabilitySerializer
    
class AvaliabilityListCreateAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Avaliability.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = AvaliabilitySerializer
