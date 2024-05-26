from django.urls import path
from .views import ShakeIndexView, ShakeDetailView, ShakeFavouriteView

urlpatterns = [
    path('', ShakeIndexView.as_view()),
    path('<int:pk>/', ShakeDetailView.as_view()),
    path('<int:pk>/favourite/', ShakeFavouriteView.as_view())
]