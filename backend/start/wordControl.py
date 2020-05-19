import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "start.settings")
import django
django.setup()
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from	django.http	import	Http404
from	rest_framework.views	import	APIView
from	rest_framework.response	import	Response
from	rest_framework	import	status
from django.forms.models import model_to_dict
import random

def studylist():
	wordlist = []
	t = Word.objects.all()
	for x in t:
		x = model_to_dict(x)
		wordlist.append(x)
	wordlist = sorted(wordlist,key = lambda e:e['ID'],reverse = False)
	return wordlist

def reviewlist(userID):
	user = userID
	wordlist = []
	reviewlist = []
	t = Word.objects.all()
	for x in t:
		x = model_to_dict(x)
		wordlist.append(x)
	wordlist = sorted(wordlist,key = lambda e:e['ID'],reverse = False)
	l = model_to_dict(StudyData.objects.get(userID=user))
	l = l['ID'].split(',')
	l = [int(x) for x in l]
	for i in l:
		reviewlist.append(wordlist[i-1])
	print(random.sample(reviewlist,4))
	return reviewlist
