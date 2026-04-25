from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
        
        def validate(self, value):
            if "error" in value:
                raise serializers.ValidationError("the name don't contains the word 'error'.")
            return value

