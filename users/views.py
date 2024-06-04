from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .models import User
from .serializers.common import RegisterSerializer
from .serializers.populated import ProfileSerializer
from rest_framework.permissions import IsAuthenticated

# oauth
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

# oauth
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
