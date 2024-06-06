from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import ShakeSerializer
from rest_framework.exceptions import ValidationError, NotFound


from.models import Shake

# Create your views here.
class ShakeIndexView(APIView):

    # To Get All
    def get(self,request):
        all_shakes = Shake.objects.all()
        serialized_shakes = ShakeSerializer(all_shakes, many=True)
        return Response(serialized_shakes.data)
    
    # To Create New
    def post(self,request):
        print('REQUEST DATA ->', request.data)
        try:
            # send the entered data to the serializer
            serialized_shake = ShakeSerializer(data=request.data)
            # check if valid
            serialized_shake.is_valid(raise_exception=True)
            # if valid, save
            serialized_shake.save()
            # return response i.e the newely created object with status code
            return Response(serialized_shake.data, status=201)
        

        # this handles validation errors
        except ValidationError as e:
            # shows error in the console
            print(e)
            # check the type of error and set it to res
            res = e.__dict__ if e.__dict__ else str(e)
            # return res with the status 
            return Response(res, status=422)
        
        except Exception as e:
            print('Exception type ->', type(e))
            print('Exception ->', e)

            res = e.__dict__ if e.__dict__ else str(e)

        return Response(res, status=500)


class ShakeDetailView(APIView):

    # Helper Method
    # This is going to help us shorten the code and get query/find/handle the shakes
    def get_shake(self,pk):
        try:
            return Shake.objects.get(pk=pk)
        except Shake.DoesNotExist as e:
            print(e)
            print(type(e))
            raise NotFound({'message': str(e)})


    # View Single Shake
    def get(self, request, pk):
        shake = self.get_shake(pk)
        serialized_shake = ShakeSerializer(shake)
        return Response(serialized_shake.data)
        
    # Update Shake
    def put(self, request, pk):
        shake = self.get_shake(pk)
        serialized_shake = ShakeSerializer(instance=shake, data=request.data, partial=True)
        if serialized_shake.is_valid():
            serialized_shake.save()
            return Response(serialized_shake.data)
        else:
            return Response(serialized_shake.errors, status=422)

    # Delete Shake
    def delete(self, request, pk):
        shake = self.get_shake(pk)
        shake.delete()
        return Response(status=204)
        
