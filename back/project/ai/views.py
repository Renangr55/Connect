from django.shortcuts import render
from rest_framework.views import APIView
from services.wattsonIA import send_message
from rest_framework.response import Response


# Create your views here.

class ChatView(APIView):
    def post(self, request):
        text = request.data.get('message')

        if not text:
            return Response({"error": "message is required"}, status=400)

        response = send_message(text)

        return Response({
            "success": True,
            "data": {
                "message": text,
                "response": str(response)
            }
        })
