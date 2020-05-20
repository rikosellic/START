import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()
from .wordControl import *
import random

EN=1
def printe(str,EN):
    if(EN==1):
        print(str)
    return

class StudyRoom: #学习房间类
    def __init__(self, roomID, hostname):
        self.roomID = roomID
        self.usernum = 1
        self.usernamelist = [hostname]
        self.hostname = hostname
        self.learning_process =[0]
        self.wordlist = []
        printe(self.usernamelist,EN)

    def setWordList(self,idlist):
        idlist=randomIdList()
        list = allWordList()
        for i in idlist:
            self.wordlist.append(list[i-1])

    def enterRoom(self,username):
        if self.usernum>=6: #满员，返回0
            return 0
        else: #加入成功，返回1
            self.usernum+=1
            self.usernamelist.append(username)
            self.learning_process.append(0)
            printe(self.usernamelist,EN)
            return 1

    def quitRoom(self,username):
        printe('test',EN)
        if self.usernum==1: #没人了，返回2
            return 2
        else: #正常退出，返回1
            self.usernum-=1
            index_to_delete=self.usernamelist.index(username)
            if index_to_delete==0:
                self.hostname = self.usernamelist[1]
            self.usernamelist.pop(index_to_delete)
            self.learning_process.pop(index_to_delete)
            return 1

    def return_process(self):
        return self.learning_process

	

class ReviewRoom: #复习房间类
    def __init__(self, roomID,hostname):
        self.roomID = roomID
        self.usernum = 1
        self.usernamelist = [hostname]
        self.hostname = hostname
        self.score =[0]
        self.wordlist = []
        self.reviewlist = []
        self.answerright=[]
        self.currentquestion=0

    def setWordList2(self):
        self.wordlist = pastWordList(convert_name_to_id(self.hostname))
        self.reviewlist = random.sample(self.wordlist,30)

    def setWordList(self):
        idlist = randomIdList()
        list = allWordList()
        for i in idlist:
            self.wordlist.append(list[i - 1])

    def enterRoom(self,username):
        if self.usernum>=6: #满员，返回0
            return 0
        else: #加入成功，返回1
            self.usernum+=1
            self.usernamelist.append(username)
            self.score.append(0)
            return 1

    def quitRoom(self,username):
        if self.usernum==1: #没人了，返回2
            return 2
        else: #正常退出，返回1
            self.usernum-=1
            index_to_delete=self.usernamelist.index(username)
            if index_to_delete==0:
                self.hostname = self.usernamelist[1]
            self.usernamelist.pop(index_to_delete)
            self.score.pop(index_to_delete)
            printe(self.usernamelist,EN)
            return 1

    def return_score(self):
        return self.score
