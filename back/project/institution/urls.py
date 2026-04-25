from django.urls import path
from .views import (
    InstitutionListCreateAPIView,
    InstitutionRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('api/institution/list_create_view',InstitutionListCreateAPIView.as_view()),
    path('api/institution/retrieve_update_delete',InstitutionRetrieveUpdateDestroyAPIView.as_view())
]