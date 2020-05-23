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
    alllist=allWordList()

    def __init__(self, roomID, hostname):
        self.roomID = roomID
        self.usernum = 1
        self.usernamelist = [hostname]
        self.hostname = hostname
        self.learning_process =[0]
        self.wordlist = []
        self.start=False
        printe(self.usernamelist,EN)

    def setWordList(self,idlist):
        idlist=randomIdList()
        for i in idlist:
            self.wordlist.append(StudyRoom.alllist[i-1])
        printe(self.wordlist,EN)

    #def returnWord(self,username):
       # index=self.usernamelist.index(username)

    def enterRoom(self,username):
        if self.usernum>=4: #满员，返回0
            return 0
        elif self.start == True:
            return 0
        else: #加入成功，返回1
            self.usernum+=1
            self.usernamelist.append(username)
            self.learning_process.append(0)
            printe(self.usernamelist,EN)
            userdict={}
            userdict['roomid']=self.roomID
            for index, username in enumerate(self.usernamelist,1):
                userdict['user'+str(index)]=username
            return userdict

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

    def returnStudyProcess(self):
        processdict = {}
        for index, name in enumerate(self.usernamelist,1):
            processdict['user' + str(index) + 'name'] = self.usernamelist[index]
            processdict['user' + str(index) + 'process'] = self.learning_process[index]+1
        processdict['usernum'] = self.usernum
        return processdict

    def nextWord(self,username):
        index=self.usernamelist.index(username)
        if self.learning_process[index]==49:
            return False
        self.learning_process[index]+=1
        return self.wordlist[self.learning_process[index]]

    def lastWord(self,username):
        index = self.usernamelist.index(username)
        if self.learning_process[index]==0:
           return False
        self.learning_process[index] -= 1
        return self.wordlist[self.learning_process[index]]

    def startStudy(self): #房间等待界面, 房主开始
        self.start=True
        return self.wordlist[0]

    def checkStart(self): #用于房间等待界面, 非房主检测是否开始
        if self.start==False:
            return False
        else:
            return self.wordlist[0]

    def checkUser(self): #房间等待界面, 获取房间内用户
        return self.usernamelist

class ReviewRoom: #复习房间类
    alllist=allWordList()

    def __init__(self, roomID,hostname):
        self.roomID = roomID
        self.usernum = 1
        self.usernamelist = [hostname]
        self.hostname = hostname
        self.score =[0]
        self.wordlist = []
        self.alreadyright=0
        self.correctanswer=[]
        self.currentquestion=0
        self.problemlist=[]
        self.start=False

    def setWordList2(self):
        self.wordlist = pastWordList(convert_name_to_id(self.hostname))
        self.reviewlist = random.sample(self.wordlist,30)

    def setWordList(self,list):
        idlist = randomIdList()
        for i in idlist:
            self.wordlist.append(list[i - 1])
        printe(self.wordlist,EN)

    def setProblemList(self): #已经选定单词，生成题目
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
                choicedict['answer'+str(index)]=ReviewRoom.alllist[id-1]['meaning']
            printe(choicedict,EN)
            self.problemlist.append(choicedict)
        printe(self.correctanswer,EN)


    def enterRoom(self,username):
        if self.usernum>=4: #满员，返回0
            return 0
        elif self.start == True: #已开始, 拒绝
            return 0
        else: #加入成功，返回1
            self.usernum+=1
            self.usernamelist.append(username)
            self.score.append(0)
            userdict={}
            userdict['roomid'] = self.roomID
            for index, username in enumerate(self.usernamelist,1):
                userdict['user' + str(index)] = username
            return userdict

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

    def returnReviewScore(self):
        scoredict={}
        for index, name in enumerate(self.usernamelist,1):
            scoredict['user'+str(index)+'name']=self.usernamelist[index]
            scoredict['user'+str(index)+'score']=self.score[index]
        scoredict['usernum']=self.usernum
        return scoredict

    def startReview(self): #房间等待界面, 房主开始
        self.start=True
        return self.problemlist[0]

    def checkStart(self): #用于房间等待界面, 非房主检测是否开始
        if self.start==False:
            return False
        else:
            return self.problemlist[0]

    def checkUser(self): #房间等待界面, 获取房间内用户
        return self.usernamelist

    def calculateScore(self,username,choice):
        index=self.usernamelist.index(username)
        if choice.strip()!=self.correctanswer[self.currentquestion].strip():
            return 0
        else:
            yourscore=10-2*self.alreadyright
            self.score[index]+=yourscore
            self.alreadyright+=1
            printe(self.score,EN)
            return yourscore

    def nextProblem(self):
        if self.currentquestion==49:
            dict={}
            for i in range(self.usernum):
                dict[self.usernamelist[i]]=self.score[i]
            return (dict,1)
        self.currentquestion+=1
        self.alreadyright=0
        return (self.problemlist[self.currentquestion],2)