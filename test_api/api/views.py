from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions


class TokenView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    "token": token.key,
                    "user_id": user.pk,
                    "email": user.email,
                    "username": user.username
                })
            return Response({"error": "Неверный логин или пароль"}, status=401)
        return Response({"error": "Введите логин и пароль"}, status=401)


class TokenCheckView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({'status': 'OK'}, status=200)
