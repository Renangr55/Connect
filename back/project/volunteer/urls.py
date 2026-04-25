from django.urls import path
from .views import (
    VolunteerListCreateAPIView,
    VolunteerRetrieveUpdateDestroyAPIView,
    AvaliabilityListCreateAPIView,
    AvaliabilityRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path("api/volunteer/list_create_view", VolunteerListCreateAPIView.as_view()),
    path("api/volunteer/retrieve_update_delete/<int:pk>", VolunteerRetrieveUpdateDestroyAPIView.as_view()),
    path("api/avaliability/list_create_view/<int:pk>",AvaliabilityListCreateAPIView.as_view()),
    path("api/avaliability/retrive_update_delete/<int:pk>/",AvaliabilityRetrieveUpdateDestroyAPIView.as_view())
]