from rest_framework import serializers
from .models import Institution

class InstitutionSerializer(serializers.Serializer):
    class Meta:
        model = Institution
        fields = '__all__'

