from django.db import models
from django.contrib.postgres.fields import ArrayField


class Shake(models.Model):

    name = models.CharField(max_length=100)
    image = models.URLField(max_length=500, blank=True, null=True)
<<<<<<< HEAD
    calories = models.PositiveIntegerField()
=======
    plan = models.CharField(max_length=50)
    calories = models.PositiveIntegerField()
    nutritional_info = models.CharField(max_length=100)
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085
    categories = models.ManyToManyField(
        'categories.Category',
        related_name='shakes'
    )
    ingredients = ArrayField(models.CharField(max_length=100, blank=True))
    instructions = models.CharField(max_length=200)
    owner = models.ForeignKey(
        'users.User',
        related_name='shakes_created',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    # for favouriting
    favourites = models.ManyToManyField(
        'users.User',
        related_name='favorite_shakes',
        blank=True
    )
<<<<<<< HEAD

    def __str__(self):
        return f'Name:{self.name}'
=======
    # New Stuff above

    def __str__(self):
        return f'Name:{self.name}, Plan:{self.plan}'
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085
