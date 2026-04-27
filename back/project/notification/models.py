from django.db import models
from django.conf import settings

# Create your models here.
#Notification  models
class Notification (models.Model):
    TYPE_CHOICE = [
        ('request', 'Request'),
        ('response', 'Response'),
    ]
    title = models.CharField(max_length=255)
    message = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    subscription = models.ForeignKey('subscription.Subscription', on_delete=models.CASCADE)
    type = models.CharField(max_length=20,choices=TYPE_CHOICE)
    
    def __str__(self):
        return self.title


