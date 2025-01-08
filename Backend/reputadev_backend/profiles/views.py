from .models import Profile
from django.http import JsonResponse


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
