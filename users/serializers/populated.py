from rest_framework.serializers import ModelSerializer
from ..models import User
from reviews.serializers.common import ReviewSerializer
from shakes.serializers.common import ShakeSerializer

class ProfileSerializer(ModelSerializer):

    reviews_created = ReviewSerializer(many=True)
    shakes_created = ShakeSerializer(many=True)

    class Meta:
        model = User
        fields = ('id','username','email','image','reviews_created','shakes_created','favorite_shakes')