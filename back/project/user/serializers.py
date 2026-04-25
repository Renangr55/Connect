from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value

