from django.urls import path
from .views import *

urlpatterns = [
    # Route for getting flights data
    path('get-flights/', get_flights, name='get_flights'), # type: ignore

    # Route for booking a flight
    path('book-flight/', book_flight, name='book_flight'), # type: ignore
    path('search/', search, name='search'), # type: ignore
    path('get-airports/', get_airports, name='get_airports') # type: ignore
]