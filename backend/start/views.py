from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from	django.http	import	Http404
from	rest_framework.views	import	APIView
from	rest_framework.response	import	Response
from	rest_framework	import	status
# Create your views here.

'''
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
'''

class UserInfoManagement(APIView): #用于处理用户信息的API接口
    def get(self, request):  #以GET方法调用，返回全部用户信息
        usersinfo = User.objects.all()
        serializer = UserSerializer(usersinfo, many=True)
        return Response(serializer.data)

    def post(self, request):     #以POST方法调用， 创建一个新用户， userID为现有用户数加1
         current_user_num=len(User.objects.all())
         input=request.data
         input['userID']=current_user_num+1
         if 'goal' not in input.keys():
             input['goal']=''
         serializer = UserSerializer(data=input)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
