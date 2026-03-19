from django.urls import path
from main import views

app_name = 'main'


urlpatterns = [
    path("", views.index, name='index'),
    path("about/", views.about, name='about'),
    path("register/", views.register, name='register'),
    path("login/", views.login, name='login')
]
