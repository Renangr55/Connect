from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Action,Address
from rest_framework.permissions import IsAuthenticated
from .serializers import ActionSerializer,AddressSerializer
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

#Action
class ActionListCreateAPIView(ListCreateAPIView):
    queryset = Action.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ActionSerializer

    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Validate the data
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
            "errors": serializer.errors # Detalhes da validação
        }, status=status.HTTP_400_BAD_REQUEST)
        

   
        
#Action
class ActionRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Action.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = Action.objects.all()
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

#Address
class AddressListCreateAPIView(ListCreateAPIView):
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer
    
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
            "errors": serializer.errors # Detalhes da validação
        }, status=status.HTTP_400_BAD_REQUEST)
   

#address
class AddressRetrieveUpdateDestroyAPIView(ListCreateAPIView):
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer
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
    
    
    
