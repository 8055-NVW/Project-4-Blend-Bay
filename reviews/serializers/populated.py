from rest_framework import serializers
from ..models import Review
from users.serializers.common import RegisterSerializer

class PopulatedReviewSerializer(serializers.ModelSerializer):
    owner = RegisterSerializer()

    class Meta:
        model = Review
        fields = '__all__'