from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('login/', include('login.urls')),
    path('hotel-details/', include('hotels.urls')),
    path('flight-details/', include('flights.urls')),
    path('attraction-details/', include('attractions.urls')),
    path ('itinerary-details/', include('itinerary.urls')),
    path('', include('frontend.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
