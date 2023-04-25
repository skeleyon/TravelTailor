from rest_framework import serializers
from attractions.models import Attraction, Reservation

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    attraction = AttractionSerializer()
    class Meta:
        model = Reservation
        fields = ('attraction', 'email')