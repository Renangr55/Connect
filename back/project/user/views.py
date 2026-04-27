from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer
from rest_framework import status
from rest_framework.response import Response

# 🔐 JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# =========================
# 🔐 LOGIN (JWT CUSTOM)
# =========================
class CustomTokenSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['role'] = user.role

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['role'] = self.user.role

        return data


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer



class CustomUserListCreateAPIView(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response({
                "message": "Create with success",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)

        return Response({
            "message": "Error to create",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class CustomUserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)

            return Response(
                {"message": "Object deleted with success!"},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {'error': 'Error to delete the object', 'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)

        except Exception:
            return Response(
                {"error": "object not found or access error"},
                status=status.HTTP_404_NOT_FOUND
            )