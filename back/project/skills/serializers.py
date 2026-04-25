from rest_framework import serializers
from .models import Skills

class SkillsSerializer(serializers.Serializer):
    class Meta:
        model = Skills
        fields = '__all__'

