from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Institution
from rest_framework.permissions import IsAuthenticated
from .serializers import InstitutionSerializer

# Institution
class InstitutionListCreateAPIView(ListCreateAPIView):
    queryset = Institution.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = InstitutionSerializer

    
class InstitutionRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = InstitutionSerializer
