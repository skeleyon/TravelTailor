from rest_framework import serializers
from flights.models import Flight, Airport, Reservation

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'

class FlightSerializer(serializers.ModelSerializer):
    origin = AirportSerializer()
    destination = AirportSerializer()
    class Meta:
        model = Flight
        fields = ('id', 'origin', 'destination', 'duration', 'price', 'no_of_seats')

class ReservationSerializer(serializers.ModelSerializer):
    flight = FlightSerializer()
    class Meta:
        model = Reservation
        fields = ('flight', 'passengers', 'email')