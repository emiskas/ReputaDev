from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import redirect, render

from .forms import CustomLoginForm, ProfileUpdateForm, UserRegistrationForm


def register(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.save()
            return redirect("login")
    else:
        form = UserRegistrationForm()
    return render(request, "accounts/register.html", {"form": form})


@login_required
def profile(request):
    if request.method == "POST":
        form = ProfileUpdateForm(request.POST, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect("profile")
    else:
        form = ProfileUpdateForm(instance=request.user.profile)
    return render(request, "accounts/profile.html", {"form": form})


def custom_login(request):
    if request.method == "POST":
        form = CustomLoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect("home")
            else:
                return HttpResponse("Invalid login credentials", status=401)
    else:
        form = CustomLoginForm()

    return render(request, "accounts/login.html", {"form": form})


def custom_logout(request):
    logout(request)
    return redirect("home")
