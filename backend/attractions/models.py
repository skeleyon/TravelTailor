from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from decimal import Decimal

# class Airport(models.Model):
#     # code = models.CharField(max_length=3)
#     city = models.CharField(max_length=64)

#     def __str__(self):
#         return self.city

class Attraction(models.Model):
    title = models.CharField(max_length=64, default='default')
    city = models.CharField(max_length=64, default='default')
    image = models.ImageField(upload_to='attraction_images/', default='default')
    description = models.CharField(max_length=64, default='default')

    def __str__(self):
        return self.title

class Reservation(models.Model):
    attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE)
    # passengers = models.IntegerField(default=1)
    email = models.EmailField(max_length=255, default='')

    def __str__(self):
        return self.email