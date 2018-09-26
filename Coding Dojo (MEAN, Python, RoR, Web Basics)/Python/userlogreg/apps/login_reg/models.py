# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
import re
import bcrypt
from models import *

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'^[a-zA-Z]+$')

class UserManager(models.Manager):
	def registerValidator(self, postData):
		registerErrors = {}
		u = User.objects.filter(email = postData['email'])
		if len(u) != 0:
			registerErrors['have_email'] = "Email already in database"
		if (len (postData["first_name"]) < 1) or (len (postData["last_name"]) < 1) or (len (postData["email"]) < 1) or (len (postData["password"]) < 1):
			registerErrors['nada'] = "A Register field has not been filled in"
		if (len(postData['first_name']) < 2) or (len(postData['last_name']) < 2):
			registerErrors['name'] = "Name needs to be at least 2 letters"
		if not (EMAIL_REGEX.match(postData['email'])):
			registerErrors['email'] = "Not a valid email"
		if not (NAME_REGEX.match(postData['first_name'])) or not (NAME_REGEX.match(postData['last_name'])):
			registerErrors['strange_input'] = "Name fields can only use letters"
		if (len(postData['password']) < 8):
			registerErrors['password'] = "Passwords must be at least 8 characters"
		if postData['password'] != postData['password_conf']:
			registerErrors['no_match'] = "Password and Confirm PW fields do not match"
		return registerErrors

	def loginValidator(self, postData):
		loginErrors = {}
		u = User.objects.filter(email = postData['email_log'])
		if len(u) == 0:
			loginErrors['wrong_email'] = "Email not assigned to a user"
			return loginErrors
		if (len (postData["email_log"]) < 1) or (len (postData["password_log"]) < 1):
			loginErrors['nada'] = "A Login field has not been filled in"
		if not bcrypt.checkpw(postData["password_log"].encode(), u[0].password.encode()):
			loginErrors['wrong_pw'] = "Incorrect password"	
		return loginErrors

class User(models.Model):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	email = models.CharField(max_length=255)
	password = models.CharField(max_length=255)
	created_at = models.DateTimeField(auto_now_add = True)
	updated_at = models.DateTimeField(auto_now = True)
	objects = UserManager()
