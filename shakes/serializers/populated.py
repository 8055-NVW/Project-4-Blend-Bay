from .common import ShakeSerializer
from users.serializers.common import RegisterSerializer
from reviews.serializers.common import ReviewSerializer
from categories.serializers.common import CategorySerializer

class PopulatedShakeSerializer(ShakeSerializer):
    owner = RegisterSerializer(required=False)
    reviews = ReviewSerializer(many=True,required=False)
    categories = CategorySerializer(many=True)