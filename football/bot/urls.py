from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('league/<str:league>/', views.league_table, name='league_table'),
]