from rest_framework.serializers import ModelSerializer
from ..models import Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        # the below is a touple hence the trailing comma
        fields = ('name',)

