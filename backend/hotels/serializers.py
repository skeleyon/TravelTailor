from rest_framework import serializers
from hotels.models import Hotel, Booking

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    hotel = HotelSerializer()
    class Meta:
        model = Booking
        fields = ('hotel', 'email')