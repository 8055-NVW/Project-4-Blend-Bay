from .models import Category
from .serializers.common import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoryListView(APIView):
    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = CategorySerializer(categories, many=True)
        return Response(serialized_categories.data)