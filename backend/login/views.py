from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def main(request):
    return HttpResponse("hey")