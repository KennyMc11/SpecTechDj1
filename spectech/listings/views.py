from django.shortcuts import render

# Create your views here.
def catalog(request):
    return render(request, 'listings/catalog.html')

def offer(request):
    return render(request, 'listings/offer.html')