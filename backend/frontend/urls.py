from django.urls import path
from .views import index
# from . import views

urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index),
    path('reset-password', index),
    path('password/reset/confirm/<str:uid>/<str:token>', index),
    path('activate/<str:uid>/<str:token>', index),
    path('booking', index),
    path('hotels', index),
    path('hotels/<str:id>', index),
    path('flights', index),
    path('attractions', index ),
    path('explore', index),
    path('itinerary', index),
    path('payment', index)
]

# urlpatterns = [
#     path('', views.index)
# ]