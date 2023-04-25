from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from decimal import Decimal

class Payments(models.Model):
    total_price = models.IntegerField()
    

    def __str__(self):
        return self.total_price
