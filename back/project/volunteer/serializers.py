from rest_framework import serializers
from .models import Volunteer, Avaliability
from skills.models import Skills


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ["id", "name"]


class AvaliabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliability
        fields = "__all__"


class VolunteerSerializer(serializers.ModelSerializer):
    # 👇 leitura bonita
    skills = SkillSerializer(many=True, read_only=True)

    # 👇 escrita (manda ids)
    skills_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skills.objects.all(),
        many=True,
        write_only=True,
        source="skills"
    )

    avaliabilities = AvaliabilitySerializer(
        source="avaliability_set",
        many=True,
        read_only=True
    )

    class Meta:
        model = Volunteer
        fields = "__all__"