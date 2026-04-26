from django.db import models
from django.conf import settings


# Create your models here.
class ChatMessage(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="messages"
    )

    role = models.CharField(max_length=10,choices=[('user', 'User'),('ai','AI')])
    

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Recommendation(models.Model):
    volunteer = models.ForeignKey('volunteer.Volunteer',on_delete=models.CASCADE,  related_name="recommendations")
    action = models.ForeignKey('action.Action', on_delete=models.CASCADE, related_name="recommendations")
    score = models.FloatField()
    
    reason = models.TextField(blank=True, null=True)  # 🔥 explicação da IA
    created_at = models.DateTimeField(auto_now_add=True)