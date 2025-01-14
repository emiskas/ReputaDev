import json

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Profile


def profile_view(request, username):
    try:
        profile = Profile.objects.get(user__username=username)
    except Profile.DoesNotExist:
        profile = None

    if profile:
        profile_data = {
            "username": profile.user.username,
            "bio": profile.bio,
            "reputation": profile.reputation,
            "avatar": profile.avatar.url,
        }
    else:
        profile_data = {
            "username": "User not found",
            "bio": "No bio available",
            "reputation": 0,
            "avatar": profile.avatar.url,
        }

    return JsonResponse(profile_data)


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        email = data.get("email", "")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        profile = Profile.objects.create(user=user)

        return JsonResponse({"message": "User registered successfully"})
    else:
        return JsonResponse({"message": "Invalid request method"})


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, status=200)
        return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)
