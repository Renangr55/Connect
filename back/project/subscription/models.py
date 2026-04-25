from django.db import models
from django.conf import settings


# Create your models here.
class Subscription(models.Model):
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="userID")
    status = models.CharField(max_length=10, choices=(
        ('pending','Pending'),
        ('approved','Approved'),
        ('rejected','Rejected'),
    ),
    default='pending'
    )
    message = models.TextField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    