from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .models import User
from .serializers.common import RegisterSerializer
from .serializers.populated import ProfileSerializer
from rest_framework.permissions import IsAuthenticated


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer




   


class ProfileView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
