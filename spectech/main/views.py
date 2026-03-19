from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from .forms import UserRegisterForm


# Create your views here.
def index(request):
    return render(request, 'main/index.html')

def about(request):
    return HttpResponse('About page')

def register(request):
    return render(request, 'main/register.html')

def login(request):
    return render(request, 'main/login.html')