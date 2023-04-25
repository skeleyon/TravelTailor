from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from decimal import Decimal

class Airport(models.Model):
    code = models.CharField(max_length=3)
    city = models.CharField(max_length=64)

    def __str__(self):
        return self.city

class Flight(models.Model):
    origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='departures')
    destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='arrivals')
    duration = models.IntegerField()
    airlines = models.CharField(max_length=64, default='default')
    image = models.ImageField(upload_to='flight_images/', default='default')
    price = models.IntegerField(default=100)
    no_of_seats = models.IntegerField(default=54)

    def __str__(self):
        return self.airlines

class Reservation(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    passengers = models.IntegerField(default=1)
    email = models.EmailField(max_length=255, default='')

    def __str__(self):
        return self.email