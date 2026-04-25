from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Skills
from rest_framework.permissions import IsAuthenticated
from .serializers import SkillsSerializer

# Skills
class SkillListCreateAPIView(ListCreateAPIView):
    queryset = Skills.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = SkillsSerializer

    
class SkillRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Skills.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = SkillsSerializer
