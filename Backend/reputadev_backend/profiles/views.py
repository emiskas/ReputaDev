from django.shortcuts import render
from .models import Profile


def profile_view(request, username):
    try:
        profile = Profile.objects.get(user__username=username)

    except Profile.DoesNotExist:
        profile = None

    context = {
        "profile": profile,
        "username": profile.user.username if profile else "User not found",
        "bio": profile.bio if profile else "No bio available",
        "reputation": profile.reputation if profile else 0,
    }

    return render(request, "profiles/profile.html", context)
