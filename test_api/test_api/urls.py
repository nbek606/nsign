from django.urls import path
from api import views


urlpatterns = [
    path('api/auth/', views.TokenView.as_view()),
    path('api/check_token/', views.TokenCheckView.as_view()),
]
