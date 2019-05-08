from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def index(request):
    return render(request, 'main_app/index.html')


def other(request):
    return render(request, 'main_app/other.html')


def review(request):
    return JsonResponse([
        {
            'title': 'first title',
            'content': 'first content'
        },
        {
            'title': 'second title',
            'content': 'second content'
        },

    ], safe=False)
