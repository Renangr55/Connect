from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Volunteer,Avaliability
from rest_framework.permissions import IsAuthenticated
from .serializers import VolunteerSerializer,AvaliabilitySerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


# Volunteer
class VolunteerListCreateAPIView(ListCreateAPIView):
    queryset = Volunteer.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = VolunteerSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Valida os dados antes de tentar salvar
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            # Resposta de Sucesso
            return Response({
                "message": "Create with sucess",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)
        
        # return the error
        return Response({
            "message": "Error to create",
            "errors": serializer.errors # error details
        }, status=status.HTTP_400_BAD_REQUEST)

        
    
    
class VolunteerRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = VolunteerSerializer
    lookup_field = 'pk'

    
    def destroy(self, request, *args, **kwargs):
        try:
            isinstance = self.get_object()
            self.perform_destroy(isinstance)
            return Response(
                {"message","Object deleted with sucess!"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error':'Error to delete the object','detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response (serializer.data)
        except Exception:
            return Response (
                {"error":"object not found or acess error"},
                status=status.HTTP_404_NOT_FOUND
            )

# Avaliability
class AvaliabilityRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Avaliability.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AvaliabilitySerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        try:
            isinstance = self.get_object()
            self.perform_destroy(isinstance)
            return Response(
                {"message","Object deleted with sucess!"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error':'Error to delete the object','detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response (serializer.data)
        except Exception:
            return Response (
                {"error":"object not found or acess error"},
                status=status.HTTP_404_NOT_FOUND
            )
            
    def patch(self, request, *args, **kwargs):
        volunteer = Volunteer.objects.get(user=request.user)
        serializer = self.get_serializer(volunteer, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)
    
class AvaliabilityListCreateAPIView(ListCreateAPIView):
    queryset = Avaliability.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AvaliabilitySerializer

    def perform_create(self, serializer):
        volunteer, created = Volunteer.objects.get_or_create(
            user=self.request.user
        )
        serializer.save(volunteer=volunteer)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "status": "error",
                "message": "Error to save",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)

        return Response({
            "status": "success",
            "message": "created with success!"
        }, status=status.HTTP_201_CREATED)

class VolunteerMeView(RetrieveUpdateDestroyAPIView):
    serializer_class = VolunteerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Volunteer.objects.get(user=self.request.user)
    
    

