from .serializers.common import ShakeSerializer
from .serializers.populated import PopulatedShakeSerializer
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly
from .models import Shake
from lib.views import ObjectOwnerView
from rest_framework.response import Response
# for search
from rest_framework.decorators import api_view
from django.db.models import Q

# new
from django.db.models import Avg


class ShakeIndexView(ObjectOwnerView, ListCreateAPIView):
    # queryset = Shake.objects.all()
    queryset = Shake.objects.annotate(average_rating=Avg('reviews__rating'))
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PopulatedShakeSerializer
        return ShakeSerializer


class ShakeDetailView(RetrieveUpdateDestroyAPIView):
    # queryset = Shake.objects.all()
    queryset = Shake.objects.annotate(average_rating=Avg('reviews__rating'))
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PopulatedShakeSerializer
        else:
            return ShakeSerializer

class ShakeFavouriteView(UpdateAPIView):
    queryset = Shake.objects.all()
    serializer_class = ShakeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, pk):
        shake = self.get_object()
        if request.user in shake.favourites.all():
            print('User in favourites list')
            shake.favourites.remove(request.user)
            shake.save()
            print(request.META)
            return Response(status=204)

        else:
            print('User NOT in favourites list')
            shake.favourites.add(request.user)
            shake.save()
            return Response(status=201)
        
@api_view(['GET'])    
def search_shakes(request):
    query = request.query_params.get('q', '')
    if query:
        shakes = Shake.objects.filter(
            Q(name__icontains=query) | 
            Q(categories__name__icontains=query)
        ).distinct()
        serializer = PopulatedShakeSerializer(shakes, many=True)
        return Response(serializer.data)
    return Response({"error": "No query provided"}, status=400)
