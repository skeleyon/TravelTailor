from django.urls import path
from .views import *

urlpatterns = [
    # Route for getting flights data
    path('get-attractions/', get_attractions, name='get_attractions'), # type: ignore
    path('search/', search, name='search'), # type: ignore

    # Route for booking a flight
    path('book-attraction/', book_attraction, name='book_attraction'), # type: ignore
    # path('search/', search, name='search'), # type: ignore
    # path('get-airports/', get_airports, name='get_airports') # type: ignore
]