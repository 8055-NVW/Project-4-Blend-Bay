<<<<<<< HEAD
from .models import Category
from .serializers.common import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoryListView(APIView):
    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = CategorySerializer(categories, many=True)
        return Response(serialized_categories.data)
=======
from django.shortcuts import render

# Create your views here.
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085
