from datetime import datetime

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_protect

from main_app.models import db


def index(request):
    return render(request, 'main_app/index.html')


def other(request):
    return render(request, 'main_app/other.html')


@csrf_protect
def review(request):
    if request.method == 'GET':
        return JsonResponse(db.reviews, safe=False)

    elif request.method == 'POST':
        form_data = request.POST.dict()
        title = form_data['title']
        content = form_data['content']
        time = datetime.now()
        
        db.reviews.append({'title': title, 'content': content, 'time': time})
        return HttpResponse('')
