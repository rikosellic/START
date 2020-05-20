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

    #def returnWord(self,username):
       # index=self.usernamelist.index(username)

    def enterRoom(self,username):
        if self.usernum>=4: #满员，返回0
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

    def returnProcess(self):
        return self.learning_process

	

class ReviewRoom: #复习房间类
    def __init__(self, roomID,hostname):
        self.roomID = roomID
        self.usernum = 1
        self.usernamelist = [hostname]
        self.hostname = hostname
        self.score =[0]
        self.wordlist = []
        self.answersituation=[False]
        self.correctanswer=[]
        self.currentquestion=0
        self.problemlist=[]

    def setWordList2(self):
        self.wordlist = pastWordList(convert_name_to_id(self.hostname))
        self.reviewlist = random.sample(self.wordlist,30)

    def setWordList(self):
        idlist = randomIdList()
        list = allWordList()
        for i in idlist:
            self.wordlist.append(list[i - 1])
        printe(self.wordlist,EN)

    def setProblemList(self): #已经选定单词，生成题目
        alllist=allWordList()
        for word in self.wordlist:
            choicelist=[]   #选项列表
            choiceidlist=[] #选项ID列表
            choicedict={} #题目词典
            id=word['ID']
            w=word['Word']
            meaning=word['meaning']
            #printe(meaning,EN)
            choicedict['word']=w
            self.correctanswer.append(meaning)
            choicelist.append(meaning)
            choiceidlist.append(id)
            while(True):
                num=random.randint(1,15000)
                if num in choiceidlist:
                    continue
                else:
                    choiceidlist.append(num)
                    if(len(choiceidlist)==4):
                        break
            random.shuffle(choiceidlist)
            for index,id in enumerate(choiceidlist,1):
                choicedict['answer'+str(index)]=alllist[id-1]['meaning']
            printe(choicedict,EN)
            self.problemlist.append(choicedict)
        printe(self.correctanswer,EN)


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
        else:  #正常退出，返回1
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