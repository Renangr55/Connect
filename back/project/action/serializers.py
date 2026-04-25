from rest_framework import serializers
from .models import Action,Address

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value
    
