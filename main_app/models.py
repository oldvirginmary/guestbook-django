# -*- coding: utf-8 -*-

from django.db import models
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=300)
    time = models.DateTimeField(default=timezone.now)
