from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Action,Address
from rest_framework.permissions import IsAuthenticated
from .serializers import ActionSerializer,AddressSerializer

# Create your views here.

#Action
class ActionListCreateAPIView(ListCreateAPIView):
    queryset = Action.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = ActionSerializer

class ActionRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Action.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = Action.objects.all()

#Address
class AddressListCreateAPIView(ListCreateAPIView):
    queryset = Address.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = Address.objects.all()
    
class AddressRetrieveUpdateDestroyAPIView(ListCreateAPIView):
    queryset = Address.objects.all()
    #permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer
    
