from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.Serializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

