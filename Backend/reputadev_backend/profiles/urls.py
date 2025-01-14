from django.urls import path
from .views import profile_view, register_view, login_view

urlpatterns = [
    path("profile/<str:username>/", profile_view, name="profile"),
    path("api/register/", register_view, name="register"),
    path("api/login/", login_view, name="login"),
]
