from rest_framework import serializers
from .models import Volunteer,Avaliability

class VolunteerSerializer(serializers.Serializer):
    class Meta:
        model = Volunteer
        fields = '__all__'

class AvaliabilitySerializer(serializers.Serializer):
    class Meta:
        model = Avaliability
        fields = '__all__'
        
