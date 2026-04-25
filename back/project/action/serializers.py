from rest_framework import serializers
from .models import Action,Address

class ActionSerializer(serializers.Serializer):
    class Meta:
        model = Action
        fields = '__all__'

class AddressSerializer(serializers.Serializer):
    class Meta:
        model = Address
        fields = '__all__'
    
