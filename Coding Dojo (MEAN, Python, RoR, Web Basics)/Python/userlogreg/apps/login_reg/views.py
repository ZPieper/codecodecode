# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect
from django.core.urlresolvers import reverse
from models import *
from django.contrib import messages
import bcrypt

def index(request):
	return render(request, 'login_reg/index.html', { "users": User.objects.all() })

def success(request):
	return render(request, 'login_reg/success.html', { "user": User.objects.get(id = request.session['id']) })

def register(request):
	registerErrors = User.objects.registerValidator(request.POST)
	if len(registerErrors):
		for tag, error in registerErrors.iteritems():
			messages.error(request, error, extra_tags = tag)
		return redirect('/')
	else:
		hash1 = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
		User.objects.create(first_name = request.POST['first_name'], last_name = request.POST['last_name'], email = request.POST['email'], password = hash1)
		request.session['id'] = len(User.objects.all())
		return redirect('/success')

def login(request):
	loginErrors = User.objects.loginValidator(request.POST)
	if len(loginErrors):
		for tag, error in loginErrors.iteritems():
			messages.error(request, error, extra_tags = tag)
		return redirect('/')
	else:
		user = User.objects.get(email = request.POST['email_log'])
		request.session['id'] = user.id
		return redirect('/success')