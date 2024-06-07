from django.urls import path
from .views import ShakeIndexView, ShakeDetailView, ShakeFavouriteView, search_shakes

urlpatterns = [
    path('', ShakeIndexView.as_view()),
    path('<int:pk>/', ShakeDetailView.as_view()),
    path('<int:pk>/favourite/', ShakeFavouriteView.as_view()),
    path('search/', search_shakes, name='search_shakes'),
]