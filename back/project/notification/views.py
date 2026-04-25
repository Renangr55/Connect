from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Notification
from rest_framework.permissions import IsAuthenticated
from .serializers import NotificationSerializer
from rest_framework import status
from rest_framework.response import Response

# subscription
class NotificationListCreateAPIView(ListCreateAPIView):
    queryset = Notification.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                "status":"error",
                "message":"Error to save",
                "errors": serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        return Response({
            "status":"sucess",
            "message":"created with sucess!",
        }, status=status.HTTP_201_CREATED)
    
   

    
class NotificationRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
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
