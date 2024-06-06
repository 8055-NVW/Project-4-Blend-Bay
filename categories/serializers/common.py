from rest_framework.serializers import ModelSerializer
from ..models import Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        # the below is a touple hence the trailing comma
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = ('name',)
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085

