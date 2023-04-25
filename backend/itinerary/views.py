# from django.shortcuts import render
# from rest_framework import viewsets
# from .serializers import ItinerarySerializer
# from .models import Itinerary

from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse
from hotels.models import *
from flights.models import Reservation as FlightReservation
from flights.models import Airport, Flight
from attractions.models import Reservation as AttractionReservation
from attractions.models import Attraction
from django.core import serializers
from attractions.serializers import AttractionSerializer, ReservationSerializer
from attractions.serializers import ReservationSerializer as AttractionReservationSerializer
from hotels.serializers import HotelSerializer, BookingSerializer
from flights.serializers import AirportSerializer, FlightSerializer, ReservationSerializer
from flights.serializers import ReservationSerializer as FlightReservationSerializer

import json
import os
import base64
from django.views.decorators.csrf import csrf_exempt
# def index(request):
#     context = {
#         'airports': Airport.objects.all(),
#         'flights': Flight.objects.all(),
#         'passengers': Passenger.objects.all()
#     }
#     return render(request, 'flight_booking_system/index.html', context)

def get_itinerary(request):
    if request.method == 'GET':
        hotels = Booking.objects.filter(
            email="abc@gmail.com"
        )
        ser_hts = BookingSerializer(hotels, many=True).data

        flights = FlightReservation.objects.filter(
            email="abc@gmail.com"
        )
        ser_fr = FlightReservationSerializer(flights, many=True).data

        attractions = AttractionReservation.objects.filter(
            email="abc@gmail.com"
        )
        ser_at = AttractionReservationSerializer(attractions, many=True).data
        return JsonResponse({"attractions": ser_at, "flights": ser_fr, "hotels": ser_hts})

def get_price(request):
    if request.method == 'GET':
        hotels = Booking.objects.filter(
            email="abc@gmail.com"
        )
        ser_hts = BookingSerializer(hotels, many=True).data
        hts_price = sum([val["hotel"]["price"] for val in ser_hts])

        flights = FlightReservation.objects.filter(
            email="abc@gmail.com"
        )
        ser_fr = FlightReservationSerializer(flights, many=True).data
        fr_price = sum([val["flight"]["price"] for val in ser_fr])

        price = hts_price + fr_price
        return JsonResponse({"total": price, "flight":fr_price, "hotel": hts_price})

# class itineraryViewSet(viewsets.ModelViewSet):
#     serializer_class = ItinerarySerializer
#     queryset = Itinerary.objects.all()
