from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Subscription
from notification.models import Notification
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import SubscriptionSerializer

# subscription
class SubscriptionListCreateAPIView(ListCreateAPIView):
    queryset = Subscription.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionSerializer
    
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
   
        
    
    def perform_create(self, serializer):
        subscription = serializer.save(
            volunteer = self.request.user.volunteer
        )
        
        Notification.objects.create(
            user=subscription.action.created_by.user,
            title="New Subscription",
            message="a Volunteer subscribed",
            subscription=subscription
        )
        
        

    
class SubscriptionRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionSerializer
    lookup_field = 'pk'

    
    def perform_update(self, serializer):
        subscription = serializer.save()
        
        if subscription.status == 'approved':
            Notification.objects.create(
                user=subscription.volunteer.user,
                title="Approved",
                message="you have approved!",
                subscription=subscription
            )
        elif subscription.status == 'rejected':
            Notification.objects.create(
                user=subscription.volunteer.user,
                title="Rejected",
                message="you have your rejected subscription!",
                subscription=subscription
            )
            
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
        