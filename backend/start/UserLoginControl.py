import time
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()
from .models import *
from .serializers import *
from django.forms.models import model_to_dict

class UserLoginControl:
    def __init__(self):
        self.logined_users={}
        self.users_history={}


    def login(self,username,password):  #登录成功, 返回True
        try:
            targetuser=User.objects.get(username=username)
            targetuserdict=model_to_dict(targetuser)
            if(targetuserdict['password']!=password):
                return False
            else:
                self.logined_users[username]=0
                self.users_history[username]=(targetuserdict['history'],False,0)
                targetuser.logined=1
                targetuser.save()
                print(self.logined_users)
                return True
        except Exception as e:
            print(e)
            return  False


    def logout(self,username): #退出登录
        targetuser = User.objects.get(username=username)
        targetuser.logined=0
        targetuser.save()
        self.logined_users.pop(username)


    def update(self): #每隔一小时更新一下状态
        while(True):
            print('Updating login situation...')
            all_users=self.logined_users.keys()
            for username in all_users:
                if self.logined_users[username]>=5:
                    self.logout(username)
                else:
                    self.logined_users[username]+=1
            print('Updated')
            time.sleep(3600)

    def checkWhetherLogin(self,username):
        if username in self.logined_users.keys():
            return 1
        else:
            return 0

    def localUpdateHistory(self,username,newhistory):
        oldhistory,label=self.users_history[username]
        label=True
        newhistorylist=newhistory.strip().split()
        if oldhistory != None:
            oldhistorylist=oldhistory.strip().split()
        else:
            oldhistorylist=[]
        for word in newhistorylist:
            if word in oldhistorylist:
                continue
            else:
                oldhistory=oldhistory+word+' '
        return

    def updateHistoryToDatabase(self):  #隔五分钟将记录写入数据库
        while True:
            print('Updating study record to database...')
            users=self.users_history.keys()
            for username in users:
                currenthistory,label,time=self.users_history[username]
                if label==True:
                    time+=1
                    targetuser = User.objects.get(username=username)
                    targetuser.history = currenthistory
                    label = False
                    targetuser.save()
                    if time==5:
                        self.logined_users.pop(username)
            print(self.logined_users)
            print('Updated study record to database')
            time.sleep(300)