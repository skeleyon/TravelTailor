from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from decimal import Decimal

class Hotel(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    price = models.IntegerField(default=100)
    type = models.CharField(max_length=200, default='premium')
    rating = models.DecimalField(decimal_places=1,max_digits=2, default=Decimal('3.5'))
    hotel_description= models.CharField(max_length=200, default='default')
    # latitude = models.DecimalField(max_length=200, decimal_places=2,max_digits=5)
    # longitude = models.DecimalField(max_length=200, decimal_places=2,max_digits=5)
    city = models.CharField(max_length=100, default='default')
    image = models.ImageField(upload_to='hotel_images/')

    def __str__(self):
        return self.name


class Booking(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE) # type: ignore
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255, default='')
    # check_in_date = models.DateField()
    # check_out_date = models.DateField()

    def __str__(self):
        return self.email
