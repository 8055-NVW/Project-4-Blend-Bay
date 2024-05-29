from django.urls import path
from .views import RegisterView, ProfileView
# JWT import
from rest_framework_simplejwt.views import TokenObtainPairView
# oauth
from . import views


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('profile/<int:pk>/', ProfileView.as_view()),
    # new
    path('google/login/', views.google_login, name='google_login')
]