from django.urls import path
from .views import *

urlpatterns = [
    path('get-itinerary/', get_itinerary, name='search'),
    path('get-price/', get_price, name='price'),
]