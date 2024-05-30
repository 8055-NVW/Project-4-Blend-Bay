from rest_framework import serializers
from ..models import Shake
# new
from categories.models import Category

class ShakeSerializer(serializers.ModelSerializer):

    categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True
    )
    
    average_rating = serializers.IntegerField(read_only=True)

    class Meta:
        model = Shake
        fields = ('__all__')