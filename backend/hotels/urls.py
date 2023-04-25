from django.urls import path
from .views import *

urlpatterns = [
    path('', get_hotels), # type: ignore
    path('cities/', get_cities), # type: ignore
    path('book-hotel/', book_hotel),
    path('search/', search, name='search')
]

