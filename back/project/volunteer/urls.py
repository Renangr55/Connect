from django.urls import path
from .views import (
    VolunteerListCreateAPIView,
    VolunteerRetrieveUpdateDestroyAPIView,
    AvaliabilityListCreateAPIView,
    AvaliabilityRetrieveUpdateDestroyAPIView,
    VolunteerMeView
)

urlpatterns = [
    path("api/volunteer/list_create_view/", VolunteerListCreateAPIView.as_view()),
    path("api/volunteer/retrieve_update_delete/<int:pk>/", VolunteerRetrieveUpdateDestroyAPIView.as_view()),

    path("api/availability/list_create_view/", AvaliabilityListCreateAPIView.as_view()),
    path("api/availability/retrive_update_delete/<int:pk>/", AvaliabilityRetrieveUpdateDestroyAPIView.as_view()),

    path("api/volunteer/me/", VolunteerMeView.as_view()),
]