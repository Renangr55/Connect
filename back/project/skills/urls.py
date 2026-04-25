from django.urls import path
from .views import (
    SkillListCreateAPIView,
    SkillRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('api/skill/list_create_view', SkillListCreateAPIView.as_view()),
    path('api/skill/retrive_update_delete', SkillRetrieveUpdateDestroyAPIView.as_view())
]