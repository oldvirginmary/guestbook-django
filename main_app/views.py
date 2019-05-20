from datetime import datetime

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.core import serializers

from main_app.models import Post
from main_app.forms import PostForm


def index(request):
    return render(request, 'main_app/index.html')


def other(request):
    return render(request, 'main_app/other.html')


@csrf_protect
def review(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        posts = serializers.serialize('json', posts)
        return JsonResponse(posts, safe=False)

    elif request.method == 'POST':
        post_form = PostForm(request.POST)

        if post_form.is_valid():
            post_form.save()
            return HttpResponse('')
        else:
            return HttpResponse(status_code=400)
    return HttpResponse(status_code=405)
