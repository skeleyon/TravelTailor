from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from .models import Attraction, Reservation
from django.core import serializers
from attractions.serializers import AttractionSerializer
import json
from django.db.models.functions import Lower
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

def get_attractions(request):
    if request.method == 'GET':
        attractions = Attraction.objects.all()
        ser_attractions = AttractionSerializer(attractions, many=True).data
        return JsonResponse({"attractions": ser_attractions})

# def get_airports(request):
#     if request.method == 'GET':
#         airports = Airport.objects.all()
#         ser_air = AirportSerializer(airports, many=True).data
#         return JsonResponse({"airports": ser_air})

@csrf_exempt
def book_attraction(request):
    if request.method == 'POST':
        attraction_ids = request.POST.getlist('id')
        string_element = attraction_ids[0]
        attraction_ids = [int(num) for num in string_element.split(',')]
        # passenger_first_name = request.POST.get('passenger_first_name')
        # passenger_last_name = request.POST.get('passenger_last_name')

        for attraction_id in attraction_ids:
            attraction = Attraction.objects.get(id=attraction_id)
            reservation = Reservation.objects.create(
                attraction=attraction,
                email='abc@gmail.com'
            )
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})

def search(request):
    # body = json.loads(request.body)
    # city = body['city']
    city = request.GET.get('city')
    attractions = Attraction.objects.annotate(city_lower=Lower('city')).filter(
        city_lower=city.lower()
    ) or Attraction.objects.all()
    ser_attractions = AttractionSerializer(attractions, many=True).data
    path = os.getcwd()
    for attraction_data in ser_attractions:
        image = attraction_data['image']  # Retrieve the image field from serialized data
        if image:
            with open(path+'/'+image, 'rb') as f:
                image_data = f.read()
                attraction_data['image'] = base64.b64encode(image_data).decode('utf-8')
    return JsonResponse({"attractions": ser_attractions})
