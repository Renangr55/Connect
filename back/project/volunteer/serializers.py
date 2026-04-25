from rest_framework import serializers
from .models import Volunteer,Avaliability

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value
        
      

class AvaliabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliability
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value
        
        
        
