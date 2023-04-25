from django.shortcuts import render
from django.http import JsonResponse
from .models import Airport, Flight, Reservation
from django.core import serializers
from flights.serializers import AirportSerializer, FlightSerializer
import json
from django.views.decorators.csrf import csrf_exempt
# def index(request):
#     context = {
#         'airports': Airport.objects.all(),
#         'flights': Flight.objects.all(),
#         'passengers': Passenger.objects.all()
#     }
#     return render(request, 'flight_booking_system/index.html', context)

def get_flights(request):
    if request.method == 'GET':
        flights = Flight.objects.all()
        ser_flights = FlightSerializer(flights, many=True).data
        return JsonResponse({"flights": ser_flights})

def get_airports(request):
    if request.method == 'GET':
        airports = Airport.objects.all()
        ser_air = AirportSerializer(airports, many=True).data
        return JsonResponse({"airports": ser_air})

@csrf_exempt
def book_flight(request):
    if request.method == 'POST':
        flight_ids = request.POST.getlist('id')
        string_element = flight_ids[0]
        flight_ids = [int(num) for num in string_element.split(',')]
        # passenger_first_name = request.POST.get('passenger_first_name')
        # passenger_last_name = request.POST.get('passenger_last_name')

        for flight_id in flight_ids:
            flight = Flight.objects.get(id=flight_id)
            reservation = Reservation.objects.create(
                flight=flight,
                email='abc@gmail.com'
            )
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})
    
@csrf_exempt
def cancel_booking(request):
    if request.method == 'POST':
        reservation_id = request.POST.get('reservation_id')
        reservation = Reservation.objects.get(id=reservation_id)
        reservation.delete()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})
    



def search(request):
    type = request.GET.get("type", "")
    flight_list = request.GET.get("flights", [])
    flight_list = json.loads(flight_list)
    result = []
    for flight in flight_list:
        flights = Flight.objects.filter(
            origin__id=int(flight["departureCity"]), destination__id=int(flight["arrivalCity"])
        )
        ser_flights = FlightSerializer(flights, many=True).data
        result += ser_flights
    if type == "round-trip":
        flight = flight_list[0]
        flights = Flight.objects.filter(
            origin__id=int(flight["arrivalCity"]), destination__id=int(flight["departureCity"])
        )
        ser_flights = FlightSerializer(flights, many=True).data
        result += ser_flights
    return JsonResponse({'flights': result})
