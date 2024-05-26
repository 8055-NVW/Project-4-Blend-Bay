from rest_framework import serializers
from ..models import Shake

class ShakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shake
        fields = ('__all__')