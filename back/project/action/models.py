from django.db import models

# Create your models here.

class Address(models.Model):
    country = models.ForeignKey('cities_light.Country',on_delete=models.SET_NULL,null=True,blank=False)
    city = models.ForeignKey('cities_light.City',on_delete=models.SET_NULL,null=True,blank=False)
    neighborhood = models.CharField(max_length=100)
    street = models.CharField(max_length=150)
    number = models.CharField(max_length=150)
    description_address = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.country} - {self.city} - {self.neighborhood} - {self.street} - {self.number} - {self.description_address}"

class Action (models.Model):
    title = models.CharField(max_length=150)
    required_skills = models.ManyToManyField('skills.Skills',)
    description = models.TextField()
    created_by = models.ForeignKey('institution.Institution', on_delete=models.CASCADE)
    localization = models.OneToOneField(Address, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="action/",null=True, blank=True)
    date = models.DateTimeField()
    
    def __str__(self):
        return self.title


