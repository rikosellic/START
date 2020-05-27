import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
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


def randomIdList():
	list=[]
	for i in range(1,15001):
		list.append(i)
	random.shuffle(list)
	return list[0:50]

def convert_id_to_name(userid):
	try:
		target=User.objects.get(userID=userid)
		return target.username
	except Exception as e:
		print(e)
		return 'RockWAN'

def convert_name_to_id(username):
	try:
		target=User.objects.get(username=username)
		return target.userID
	except Exception as e:
		print(e)
		return  1

def allWordList():
	wordlist = []
	t = Word.objects.all()
	for x in t:
		x = model_to_dict(x)
		x.pop('GQS')
		x.pop('GQFC')
		x.pop('XZFC')
		x.pop('FS')
		if x['lx']!=None:
			x['lx']=x['lx'].replace("/r/n","<br>")
		wordlist.append(x)
	wordlist = sorted(wordlist,key = lambda e:e['ID'],reverse = False)
	return wordlist

def pastWordList(userID):
	user = userID
	wordlist = []
	reviewlist = []
	t = Word.objects.all()
	for x in t:
		x = model_to_dict(x)
		x.pop('GQS')
		x.pop('GQFC')
		x.pop('XZFC')
		x.pop('FS')
		wordlist.append(x)
	wordlist = sorted(wordlist,key = lambda e:e['ID'],reverse = False)
	l = model_to_dict(StudyData.objects.get(userID=user))
	l = l['ID'].split(',')
	l = [int(x) for x in l]
	for i in l:
		reviewlist.append(wordlist[i-1])
	print(random.sample(reviewlist,4))
	return reviewlist
