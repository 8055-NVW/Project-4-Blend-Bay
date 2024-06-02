from .common import ShakeSerializer
from users.serializers.common import RegisterSerializer
# new
from reviews.serializers.populated import PopulatedReviewSerializer
# from reviews.serializers.common import ReviewSerializer
from categories.serializers.common import CategorySerializer

class PopulatedShakeSerializer(ShakeSerializer):
    owner = RegisterSerializer(required=False)
    reviews = PopulatedReviewSerializer(many=True,required=False)
    categories = CategorySerializer(many=True)