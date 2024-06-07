"""
URL configuration for finalproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# new For Deployment
from django.urls import path, include, re_path
from .views import index
# new ^^^^
# from django.urls import path, include
# from users.views import GoogleLogin

from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

# new
@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/shakes/', include('shakes.urls')),
    path('api/auth/', include('users.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/categories/', include('categories.urls')),
    # OAUTH
    # path('api/accounts/', include('allauth.urls')),
    # path('api/accounts/google/login/', GoogleLogin.as_view(), name='google_login'),
    # new
    path('api/set-token/', set_csrf_token),
    # For Deployment
    re_path(r'^.*$', index)
]
