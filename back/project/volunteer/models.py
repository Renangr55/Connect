from django.db import models
from django.conf import settings

#Volunteer Class
class Volunteer (models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    skills = models.ManyToManyField('skills.Skills')
    volunteer_city = models.ForeignKey('cities_light.City',on_delete=models.SET_NULL,null=True,blank=False)
    context = models.TextField()
    
#Avaliability Class
class Avaliability (models.Model):
    WEEK_DAYS = [
        ("mon","Monday"),
        ("tue", "Thusday"),
        ("wed","Wednesday"),
        ("thu","Thursday"),
        ("fri","Friday"),
        ("sat","Saturday"),
        ("sun","Sunday")
    ]
    
    PERIODS = [
        ("morning","Morning"),
        ("afternoon","Afternoon"),
        ("evening","Evening")
    ]
    
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE, null=False)
    day = models.CharField(choices=WEEK_DAYS, max_length=10, null=False)
    period = models.CharField(choices=PERIODS, max_length=10, null=False)
    
