from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from .models import Skills
from .serializers import SkillsSerializer


# =========================
# SKILLS LIST / CREATE
# =========================
class SkillListCreateAPIView(ListCreateAPIView):
    queryset = Skills.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SkillsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)

            return Response(
                {
                    "message": "Created successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            {
                "message": "Error creating skill",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class SkillRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Skills.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SkillsSerializer
    lookup_field = "pk"

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)

        except Exception:
            return Response(
                {"error": "Skill not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)

            return Response(
                {"message": "Skill deleted successfully"},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {
                    "error": "Error deleting skill",
                    "detail": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )