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
import re
from operator import itemgetter, attrgetter

t = Word.objects.all()

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

def searchWord(word):
	wordlist = []
	for x in t:
		x = model_to_dict(x)
		x.pop('GQS')
		x.pop('GQFC')
		x.pop('XZFC')
		x.pop('FS')
		x.pop('lx')
		wordlist.append(x)
	suggestions = []
	result = []
    # 非贪婪匹配，转换 'djm' 为 'd.*?j.*?m'
    # pattern = '.*?'.join(key)
	pattern = '.*?'.join(word)
    # 编译正则表达式
	regex = re.compile(pattern)
	for item in wordlist:
		it = item['Word']
        # print("item",item['name'])
        # 检查当前项是否与regex匹配。
		match = regex.search(it)
		if match:
            # 如果匹配，就添加到列表中
			suggestions.append((len(match.group()),match.start(),item))
	if suggestions ==[]:
		word = word[0:int((len(word)+1)/2)]
		pattern = '.*?'.join(word)
		regex = re.compile(pattern)
		for item in wordlist:
			it = item['Word']
			match = regex.search(it)
			if match:
				suggestions.append((match.start(),len(match.group()),item))
	suggestions = [x for _,_,x in sorted(suggestions,key = itemgetter(0,1),reverse = False)]
	for ite in suggestions:
		ite['meaning'] = ite['meaning'].replace("<br>",' ')
		result.append(ite)
	print(result[0:8])
	return result[0:8]