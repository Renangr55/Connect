from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser (AbstractUser):
    ROLE_CHOICES = [
        ("volunteer","volunteeer"),
        ("institution","institution")
    ]
    
    role = models.CharField(max_length=11, choices=ROLE_CHOICES, null=False)
    
    def __str__(self):
        return self.username
    
