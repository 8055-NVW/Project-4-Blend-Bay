from django.urls import path
<<<<<<< HEAD
from .views import ShakeIndexView, ShakeDetailView, ShakeFavouriteView, search_shakes
=======
from .views import ShakeIndexView, ShakeDetailView, ShakeFavouriteView
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085

urlpatterns = [
    path('', ShakeIndexView.as_view()),
    path('<int:pk>/', ShakeDetailView.as_view()),
<<<<<<< HEAD
    path('<int:pk>/favourite/', ShakeFavouriteView.as_view()),
    path('search/', search_shakes, name='search_shakes'),
=======
    path('<int:pk>/favourite/', ShakeFavouriteView.as_view())
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085
]