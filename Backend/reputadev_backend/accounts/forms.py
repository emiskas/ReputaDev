from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from profiles.models import Profile


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirmation = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ["username", "email"]

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirmation = cleaned_data.get("password_confirmation")

        if password != password_confirmation:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ["bio", "avatar"]


class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(
        max_length=150, widget=forms.TextInput(attrs={"autofocus": True})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"autocomplete": "current-password"})
    )
