from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Review(models.Model):
    text = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    shake = models.ForeignKey(
        'shakes.Shake',
        related_name='reviews',
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        'users.User',
        related_name='reviews_created',
        on_delete=models.CASCADE,
        # good habit 
        blank=True
    )
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    
    def __str__(self):
        return f'Review: {self.text}, By: {self.owner}, For: {self.shake}'