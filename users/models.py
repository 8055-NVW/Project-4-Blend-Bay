from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    
    image = models.URLField(max_length=500, blank=True, null=True)
