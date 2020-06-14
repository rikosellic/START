# coding=utf-8
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from	django.http	import	Http404
from	rest_framework.views	import	APIView
from	rest_framework.response	import	Response
from	rest_framework	import	status
from .roomControl import  RoomControl
from .UserLoginControl import UserLoginControl
import threading
import json
from .wordControl import *
from dwebsocket.decorators import accept_websocket
import time
from .concreteclass import users_history

TESTAPI=0  #1表示测试版API, 0表示正常API
EN=1

roomcontroller=RoomControl()
print('RoomController created')
userlogincontroller=UserLoginControl()
print('Userlogincontroller created')
if TESTAPI==1:

    testid=roomcontroller.createStudyRoom('ZSK')
    roomcontroller.enterRoom('SL',testid)
    roomcontroller.enterRoom('YZY',testid)
    roomcontroller.studySetWordList(testid)
    roomcontroller.startStudy(testid)



    testid2 = roomcontroller.createReviewRoom('WXY')
    roomcontroller.enterRoom('LWL', testid2)
    roomcontroller.enterRoom('TYB', testid2)
    roomcontroller.setReviewProblem(testid2)
    roomcontroller.startReview(testid2)
    print('当前使用测试版API')
    print('测试用学习房间ID: ', testid)
    print('房主ZSK,用户 SL, YZY', '已开始')
    print('测试用复习房间ID: ', testid2)
    print('房主WXY,用户 LWL, TYB','已开始')

t1=threading.Thread(target=userlogincontroller.update)
t2=threading.Thread(target=userlogincontroller.updateHistoryToDatabase)
t1.start()
t2.start()


def printe(str,EN):
    if(EN==1):
        print(str)
    return

# Create your views here.

class UserInfoManagement(APIView): #用于处理用户信息的API接口
    def get(self, request):  #以GET方法调用，返回全部用户信息
        usersinfo = User.objects.all()
        serializer = UserSerializer(usersinfo, many=True)
        print(list(User.objects.all().values_list('userID','username'))[0][0])
        return Response(json.dumps(serializer.data,ensure_ascii=False))

    def post(self, request):     #以POST方法调用， 创建一个新用户， userID为现有用户数加1
        current_user_num=len(User.objects.all())
        input=request.data
        print (input)
        input['userID']=current_user_num+1
        if 'goal' not in input.keys():
            input['goal']="No goal yet."
            input['logined']=False
        serializer = UserSerializer(data=input)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(json.dumps(serializer.data,ensure_ascii=False), status=status.HTTP_201_CREATED)
        return Response(json.dumps(serializer.errors,ensure_ascii=False), status=status.HTTP_400_BAD_REQUEST)

class CreateStudyRoom(APIView):#用于创建学习房间
    def post(self,request):
        #print('running')
        input=request.data
        username=input['username']
        print(username)
        roomid=roomcontroller.createStudyRoom(username)
        if(roomid!=0):
            return Response(roomid,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class EnterRoom(APIView): #用于加入房间
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        username=input['username']
        result=roomcontroller.enterRoom(username,roomid)
        if result!=False:
            return Response(json.dumps(result,ensure_ascii=False),status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):#用于用户登录
    def post(self,request):
        input=request.data
        username=input['username']
        password=input['password']
        result=userlogincontroller.login(username,password)
        if result==True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class QuitStudyRoom(APIView):#用于退出房间
    def post(self,request):
        input=request.data
        print(request.data)
        roomid = int(input['roomid'])
        username = input['username']
        result=roomcontroller.quitStudyRoom(username,roomid)
        if result==True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateReviewRoom(APIView):#用于创建复习房间
        def post(self,request):
            input=request.data
            username=input['username']
            print(username)
            roomid=roomcontroller.createReviewRoom(username)
            if(roomid!=0):
                return Response(roomid,status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)



class QuitReviewRoom(APIView):#用于退出房间
    def post(self,request):
        input=request.data
        roomid =int( input['roomid'])
        username = input['username']
        result=roomcontroller.quitReviewRoom(username,roomid)
        if result==True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SetReviewProblem(APIView): #生成复习房间题目
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        result=roomcontroller.setReviewProblem(roomid)
        if result==True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class StartStudy(APIView): #房主开始学习
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        result=roomcontroller.startStudy(roomid)
        if result!=0:
            printe(result,EN)
            return Response(json.dumps(result,ensure_ascii=False),status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StudySetWordList(APIView): #学习房间房主选择单词
    def post(self,request):
        input = request.data
        roomid =int( input['roomid'])
        result=roomcontroller.studySetWordList(roomid)
        if result==True:
            return Response( status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class NextWord(APIView): #学习界面, 下一题
    def post(self, request):
        input = request.data
        roomid =int( input['roomid'])
        if TESTAPI==1:
            roomid=testid
        username = input['username']
        result=roomcontroller.nextWord(roomid,username)
        if result==False:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        elif result==-1:
            return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
        else:
            return Response(json.dumps(result,ensure_ascii=False), status=status.HTTP_200_OK)

class LastWord(APIView): #学习界面, 上一题
    def post(self, request):
        input = request.data
        roomid =int( input['roomid'])
        if TESTAPI==1:
            roomid=testid
        username = input['username']
        result,label=roomcontroller.lastWord(roomid,username)
        if result==False:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        elif label==0:
            return Response(json.dumps(result,ensure_ascii=False), status=status.HTTP_501_NOT_IMPLEMENTED)
        else:
            return Response(json.dumps(result,ensure_ascii=False), status=status.HTTP_200_OK)

class StartReview(APIView): #房主开始学习
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        result=roomcontroller.startReview(roomid)
        if result!=0:
            printe(result,EN)
            return Response(json.dumps(result,ensure_ascii=False),status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ReviewCheckStart(APIView): #学习房间非房主检查是否开始
    def post(self, request):
        input = request.data
        roomid = int(input['roomid'])
        result=roomcontroller.reviewCheckStart(roomid)
        if result==0: #未开始
            return Response(0,status=status.HTTP_200_OK)
        elif result==2: #出错
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else: #开始了
            return Response(1,status=status.HTTP_200_OK)

class CalculateScore(APIView): #提交答案
    def post(self,request):
        input = request.data
        roomid = int(input['roomid'])
        if TESTAPI==1:
            roomid=testid2
        username = input['username']
        choice = input['choice']
        result=roomcontroller.calculateScore(username,roomid,choice)
        if result!=-1:
            printe(result,EN)
            return Response(json.dumps(result,ensure_ascii=False), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class NextProblem(APIView): #下一题
    def post(self,request):
        input = request.data
        roomid =int( input['roomid'])
        username=input['username']
        if TESTAPI==1:
            roomid=testid2
        result,label=roomcontroller.nextProblem(roomid,username)
        if result!=False:
            if label==2:
                result['status']= 200
                return  Response(json.dumps(result,ensure_ascii=False),status=status.HTTP_200_OK)
            else:
                result['status'] = 202
                return Response(json.dumps(result,ensure_ascii=False), status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ReturnStudyProcess(APIView):
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        if TESTAPI==1:
            roomid=testid
        result=roomcontroller.returnStudyProcess(roomid)
        if result==False:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(json.dumps(result,ensure_ascii=False),status=status.HTTP_200_OK)

class ReturnReviewScore(APIView):
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        if TESTAPI==1:
            roomid=testid2
        result=roomcontroller.returnReviewScore(roomid)
        if result==False:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(json.dumps(result,ensure_ascii=False),status=status.HTTP_200_OK)

class StudyWaitCheckUser(APIView):
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        result=roomcontroller.studyWaitCheckUser(roomid)
        if result!=False:
            return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ReviewWaitCheckUser(APIView):
    def post(self,request):
        input=request.data
        roomid=int(input['roomid'])
        result=roomcontroller.reviewWaitCheckUser(roomid)
        if result!=False:
            return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class StudyRoomSpeak(APIView):
    def post(self, request):
        input = request.data
        roomid = int(input['roomid'])
        username=input['username']
        str=input['str']
        print(str)
        if TESTAPI == 1:
            roomid = testid
        result=roomcontroller.studyRoomSpeak(roomid,username,str)
        if result==True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ReviewRoomSpeak(APIView):
    def post(self, request):
        input = request.data
        roomid = int(input['roomid'])
        username=input['username']
        str=input['str']
        print(str)
        if TESTAPI == 1:
            roomid = testid2
        result=roomcontroller.reviewRoomSpeak(roomid,username,str)
        if result==True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class StudyRoomCheckTalk(APIView):
    def post(self, request):
        input = request.data
        roomid = int(input['roomid'])
        if TESTAPI == 1:
            roomid = testid
        result=roomcontroller.studyRoomCheckTalk(roomid)
        if result!=False:
            return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ReviewRoomCheckTalk(APIView):
    def post(self, request):
        input = request.data
        roomid = int(input['roomid'])
        if TESTAPI == 1:
            roomid = testid2
        result=roomcontroller.reviewRoomCheckTalk(roomid)
        if result!=False:
            return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetStudyRecord(APIView):
    def post(self,request):
        input=request.data
        username=input['username']
        target = User.objects.get(username=username)
        target= model_to_dict(target)
        try:
            result={}
            result['userID']=target['userID']
            result['username']=target['username']
            result['email']=target['email']
            history,label,time=users_history[username]
            if history!=None:
                result['history']=history
                return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
            else:
                result['history']='None!'
                return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        except Exception as e:
            print (e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
			
class SearchWord(APIView):
    def post(self,request):
        input=request.data
        word=input['word']
        result=searchWord(word)
        if result!=False:
            return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@accept_websocket
def ReturnReviewScore_websocket(request):
    if request.is_websocket():
        print('websocket for score created')
        roomid=int(request.websocket.wait())
        print('roomid',roomid)
        roomcontroller.addclient(request, study=False, index=1, roomid=roomid)
        time.sleep(0.5)
        result = roomcontroller.returnReviewScore(roomid)
        if result != False:
            for key in roomcontroller.ReviewRoomClients[roomid].keys():
                if key != 'index':
                    roomcontroller.ReviewRoomClients[roomid][key].send(json.dumps(result, ensure_ascii=False))
        while True:
            if roomcontroller.ReviewRoomDict[roomid].scorechanged==True:
                result = roomcontroller.returnReviewScore(roomid)
                if result!=False:
                    for key in roomcontroller.ReviewRoomClients[roomid].keys():
                        if key!='index':
                            roomcontroller.ReviewRoomClients[roomid][key].send(json.dumps(result, ensure_ascii=False))
                    roomcontroller.ReviewRoomDict[roomid].scorechanged=False
            if roomcontroller.ReviewRoomDict[roomid].end==True:
                request.websocket.close()
                return
            time.sleep(0.1)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@accept_websocket
def ReviewRoomCheckTalk_websocket(request):
    if request.is_websocket():
        print('websocket for talk created')
        roomid = request.websocket.wait()
        roomid = str(roomid, encoding='utf-8')
        if roomid[0:6]=='jumped':
            roomid=int(roomid[6:])
            roomcontroller.addclient(request, study=False, index=4, roomid=roomid)
            time.sleep(0.5)
            result = roomcontroller.reviewRoomCheckTalk(roomid)
            if result != False:
                for key in roomcontroller.ReviewRoomClients4[roomid].keys():
                    if key != 'index':
                        roomcontroller.ReviewRoomClients4[roomid][key].send(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                roomcontroller.ReviewRoomDict[roomid].talkchanged = False
            while True:
                if roomcontroller.ReviewRoomDict[roomid].talkchanged == True:
                    result = roomcontroller.reviewRoomCheckTalk(roomid)
                    if result != False:
                        for key in roomcontroller.ReviewRoomClients4[roomid].keys():
                            if key != 'index':
                                roomcontroller.ReviewRoomClients4[roomid][key].send(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                        roomcontroller.ReviewRoomDict[roomid].talkchanged = False
                if roomcontroller.ReviewRoomDict[roomid].end == True:
                    request.websocket.close()
                    return
                time.sleep(0.1)
        else:
            roomid=int(roomid)
            print('roomid', roomid)
            roomcontroller.addclient(request, study=False, index=2, roomid=roomid)
            while True:
                if roomcontroller.ReviewRoomDict[roomid].talkchanged==True:
                    result=roomcontroller.reviewRoomCheckTalk(roomid)
                    if result != False:
                        for key in roomcontroller.ReviewRoomClients2[roomid].keys():
                            if key != 'index':
                                roomcontroller.ReviewRoomClients2[roomid][key].send(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                        roomcontroller.ReviewRoomDict[roomid].talkchanged = False
                if roomcontroller.ReviewRoomDict[roomid].end == True:
                    request.websocket.close()
                    return
                time.sleep(0.1)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@accept_websocket
def StudyRoomCheckTalk_websocket(request):
    if request.is_websocket():
        print('websocket for talk created')
        roomid = request.websocket.wait()
        roomid=str(roomid,encoding='utf-8')
        if roomid[0:6]=='jumped':
            roomid = int(roomid[6:])
            roomcontroller.addclient(request, study=True, index=4, roomid=roomid)
            time.sleep(0.5)
            result = roomcontroller.studyRoomCheckTalk(roomid)
            if result != False:
                for key in roomcontroller.StudyRoomClients4[roomid].keys():
                    if key != 'index':
                        roomcontroller.StudyRoomClients4[roomid][key].send(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                roomcontroller.StudyRoomDict[roomid].talkchanged = False
            while True:
                if roomcontroller.StudyRoomDict[roomid].talkchanged == True:
                    result = roomcontroller.studyRoomCheckTalk(roomid)
                    if result != False:
                        for key in roomcontroller.StudyRoomClients4[roomid].keys():
                            if key != 'index':
                                roomcontroller.StudyRoomClients4[roomid][key].send(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                        roomcontroller.StudyRoomDict[roomid].talkchanged = False
                time.sleep(0.1)
        else:
            roomid=int(roomid)
            print('roomid', roomid)
            roomcontroller.addclient(request, study=True, index=2, roomid=roomid)
            while True:
                if roomcontroller.StudyRoomDict[roomid].talkchanged==True:
                    result=roomcontroller.studyRoomCheckTalk(roomid)
                    if result != False:
                        for key in roomcontroller.StudyRoomClients2[roomid].keys():
                            if key != 'index':
                                roomcontroller.StudyRoomClients2[roomid][key].send(json.dumps(result, ensure_ascii=False).encode('utf-8'))
                        roomcontroller.StudyRoomDict[roomid].talkchanged = False
                time.sleep(0.1)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@accept_websocket
def ReturnStudyProcess_websocket(request):
    if request.is_websocket():
        print('websocket for process created')
        roomid = int(request.websocket.wait())
        print('roomid', roomid)
        roomcontroller.addclient(request, study=True, index=1, roomid=roomid)
        time.sleep(0.5)
        result = roomcontroller.returnStudyProcess(roomid)
        if result != False:
            for key in roomcontroller.StudyRoomClients[roomid].keys():
                if key != 'index':
                    roomcontroller.StudyRoomClients[roomid][key].send(json.dumps(result, ensure_ascii=False))
        while True:
            if roomcontroller.StudyRoomDict[roomid].processchanged == True:
                result = roomcontroller.returnStudyProcess(roomid)
                if result != False:
                    for key in roomcontroller.StudyRoomClients[roomid].keys():
                        if key != 'index':
                            roomcontroller.StudyRoomClients[roomid][key].send(json.dumps(result, ensure_ascii=False))
                    roomcontroller.StudyRoomDict[roomid].processchanged = False
            time.sleep(0.1)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@accept_websocket
def StudyWaitCheckUser_websocket(request):
    if request.is_websocket():
        print('websocket for check user created')
        roomid = int(request.websocket.wait())
        roomcontroller.addclient(request, study=True, index=3, roomid=roomid)
        time.sleep(0.5)
        result = roomcontroller.studyWaitCheckUser(roomid)
        if result != False:
            for key in roomcontroller.StudyRoomClients3[roomid].keys():
                if key != 'index':
                    roomcontroller.StudyRoomClients3[roomid][key].send(json.dumps(result, ensure_ascii=False))
        while True:
            if roomcontroller.StudyRoomDict[roomid].usernumchanged == True:
                result=roomcontroller.studyWaitCheckUser(roomid)
                if result != False:
                    for key in roomcontroller.StudyRoomClients3[roomid].keys():
                        if key != 'index':
                            roomcontroller.StudyRoomClients3[roomid][key].send(json.dumps(result, ensure_ascii=False))
                    roomcontroller.StudyRoomDict[roomid].usernumchanged = False
            time.sleep(0.5)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@accept_websocket
def ReviewWaitCheckUser_websocket(request):
    if request.is_websocket():
        print('websocket for check user created')
        roomid = int(request.websocket.wait())
        roomcontroller.addclient(request,study=False,index=3,roomid=roomid)
        time.sleep(0.5)
        result = roomcontroller.reviewWaitCheckUser(roomid)
        if result != False:
            for key in roomcontroller.ReviewRoomClients3[roomid].keys():
                if key != 'index':
                    roomcontroller.ReviewRoomClients3[roomid][key].send(json.dumps(result, ensure_ascii=False))
        while True:
            if roomcontroller.ReviewRoomDict[roomid].usernumchanged == True  :
                result = roomcontroller.reviewWaitCheckUser(roomid)
                if result != False:
                    for key in roomcontroller.ReviewRoomClients3[roomid].keys():
                        if key != 'index':
                            roomcontroller.ReviewRoomClients3[roomid][key].send(json.dumps(result, ensure_ascii=False))
                    roomcontroller.ReviewRoomDict[roomid].usernumchanged = False
            if roomcontroller.ReviewRoomDict[roomid].start== True  :
                print('started')
                result = roomcontroller.reviewWaitCheckUser(roomid)
                if result != False:
                    for key in roomcontroller.ReviewRoomClients3[roomid].keys():
                        if key != 'index':
                            roomcontroller.ReviewRoomClients3[roomid][key].send(json.dumps(result, ensure_ascii=False))
                            roomcontroller.ReviewRoomClients3[roomid][key].close()
                    break
                    return
            time.sleep(0.1)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class StudyRoomToReviewRoom(APIView):
    def post(self,request):
        input = request.data
        print(input)
        username = input['username']
        roomid = int(input['roomid'])
        try:
            newid=roomcontroller.studyToReview(roomid,username)
            result={}
            result['newid']=newid
            return Response(json.dumps(result, ensure_ascii=False), status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)