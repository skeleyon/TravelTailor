
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Hotel, Booking
from django.http import JsonResponse
from hotels.serializers import HotelSerializer
import json
from django.db.models.functions import Lower
import os
import base64
from django.views.decorators.csrf import csrf_exempt

def get_cities(request):
    if request.method == 'GET':
        hotels = Hotel.objects.all()
        ser_hotels = HotelSerializer(hotels, many=True).data
        ser_cities = [val['city'] for val in ser_hotels]
        return JsonResponse({"hotels": ser_hotels})

def get_hotels(request):
    if request.method == 'GET':
        hotels = Hotel.objects.all()
        ser_hotels = HotelSerializer(hotels, many=True).data
        path = os.getcwd()
        for hotel_data in ser_hotels:
            image = hotel_data['image']  # Retrieve the image field from serialized data
            if image:
                with open(path+'/'+image, 'rb') as f:
                    image_data = f.read()
                    hotel_data['image'] = base64.b64encode(image_data).decode('utf-8')
        return JsonResponse({"hotels": ser_hotels})

def get_hotel(request):
    id = request.GET.get('id')
    hotel = Hotel.objects.get(id=id)
    ser_hotel = HotelSerializer(hotel).data
    image = ser_hotel['image']  # Retrieve the image field from serialized data
    path = os.getcwd()
    if image:
        with open(path+'/'+image, 'rb') as f:
            image_data = f.read()
            ser_hotel['image'] = base64.b64encode(image_data).decode('utf-8')
    return JsonResponse({"hotels": ser_hotel})

@csrf_exempt
def book_hotel(request):
    if request.method == 'POST':
        hotel_id = int(request.POST.get('id'))
        # passenger_first_name = request.POST.get('passenger_first_name')
        # passenger_last_name = request.POST.get('passenger_last_name')

        hotel = Hotel.objects.get(id=hotel_id)
        reservation = Booking.objects.create(
            hotel=hotel,
            email='abc@gmail.com'
        )
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})
    
@csrf_exempt
def cancel_hotel_booking(request):
    if request.method == 'POST':
        booking_id = int(request.POST.get('booking_id'))

        try:
            booking = Booking.objects.get(id=booking_id)
            booking.delete()
            return JsonResponse({'success': True})
        except Booking.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Booking not found'})
    else:
        return JsonResponse({'success': False})


# search based on city name
def search(request):
    # body = json.loads(request.body)
    # city = body['city']
    city = request.GET.get('city')
    hotels = Hotel.objects.annotate(city_lower=Lower('city')).filter(
        city_lower=city.lower()
    ) or Hotel.objects.all()
    ser_hotels = HotelSerializer(hotels, many=True).data
    path = os.getcwd()
    for hotel_data in ser_hotels:
        image = hotel_data['image']  # Retrieve the image field from serialized data
        if image:
            with open(path+'/'+image, 'rb') as f:
                image_data = f.read()
                hotel_data['image'] = base64.b64encode(image_data).decode('utf-8')
    return JsonResponse({"hotels": ser_hotels})