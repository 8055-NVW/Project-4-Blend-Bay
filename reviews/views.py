from .models import Review
from .serializers.common import ReviewSerializer
from rest_framework.generics import CreateAPIView, DestroyAPIView 
from rest_framework.permissions import IsAuthenticated
from lib.views import ObjectOwnerView
from lib.permissions import IsOwner


# To Create Reviews
class ReviewCreateView(ObjectOwnerView ,CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
# To Delete Reviews
class ReviewDestroyView(DestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOwner]



