from .common import ShakeSerializer
from users.serializers.common import RegisterSerializer
from reviews.serializers.common import ReviewSerializer
from categories.serializers.common import CategorySerializer

class PopulatedRecordSerializer(ShakeSerializer):
    owner = RegisterSerializer()
    reviews = ReviewSerializer(many=True)
    categories = CategorySerializer(many=True)