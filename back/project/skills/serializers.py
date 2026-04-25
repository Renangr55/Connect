from rest_framework import serializers
from .models import Skills

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value

