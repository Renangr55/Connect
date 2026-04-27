from rest_framework import serializers
from .models import CustomUser
from volunteer.models import Volunteer
from institution.models import Institution  # 👈 importa

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )

        # 🔥 lógica por role
        if user.role == "volunteer":
            Volunteer.objects.create(user=user)

        elif user.role == "institution":
            Institution.objects.create(user=user)

        return user