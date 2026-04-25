from django.contrib import admin
from .models import Volunteer,Avaliability
# Register your models here.
@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('user','volunteer_city','context')
    search_fields = ('user','skills','volunteer_city')

@admin.register(Avaliability)
class AvaliabilityAdmin(admin.ModelAdmin):
    list_display = ('volunteer','day','period')
    