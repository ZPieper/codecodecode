# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect
from time import strftime, localtime

def index(request):
	if 'inputs' not in request.session:
		request.session['inputs'] = []
	return render(request, 'sess_words/words.html')

def clear(request):
	request.session['inputs'] = []
	return redirect('/words')

def result(request):
	if request.method == 'POST':
		inputs = {
			'word': request.POST['word'],
			'datetime': " - "+strftime("%Y-%m-%d %H:%M %p", localtime()),
			'color': request.POST['color'],
			'font': request.POST['font']
		}

		request.session['inputs'].append(inputs)
		request.session['inputs'] = request.session['inputs']

	return redirect('/words')