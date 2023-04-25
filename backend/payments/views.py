from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PaymentSerializer
from .models import Payments
from django.http import JsonResponse
from flights.models import Reservation
from hotels.models import Booking

# Create your views here.


def calculate_total_price(request, passengers):
    flight_price = Reservation.objects.filter(passengers=passengers).first().flight.price
    hotel_price = Booking.objects.first().hotel.price
    total_price = flight_price + hotel_price
    response = {'total_price': total_price}
    return JsonResponse(response)
