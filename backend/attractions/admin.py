from django.contrib import admin

# Register your models here.
from .models import Attraction, Reservation

admin.site.register(Attraction)
admin.site.register(Reservation)