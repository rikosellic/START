# coding=utf-8
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

users_history={}


def localUpdateHistory(username, newhistory):
    oldhistory, label, time = users_history[username]
    label = True
    newhistorylist = newhistory.strip().split()
    if oldhistory != None:
        oldhistorylist = oldhistory.strip().split()
    else:
        oldhistorylist = []
        oldhistory=''
    for word in newhistorylist:
        if word in oldhistorylist:
            continue
        else:
            oldhistory = oldhistory + word + ' '
    print(users_history)
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
        self.talknum=0
        self.talkstring=''
        self.allwordstring='' #用于更新用户学习记录
        printe(self.usernamelist,EN)
        self.talkchanged=False
        self.processchanged=True
        self.usernumchanged=False

    def setWordList(self,idlist):
        if self.wordlist!=[]:
            return
        idlist=randomIdList()
        for i in idlist:
            worddict=StudyRoom.alllist[i-1]
            self.wordlist.append(worddict)
            self.allwordstring=self.allwordstring+worddict['Word']+' '
        #printe(self.wordlist,EN)

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
            userdict={}
            userdict['roomid']=self.roomID
            for index, username in enumerate(self.usernamelist):
                userdict['user'+str(index+1)]=username
            self.usernumchanged=True
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
        for index, name in enumerate(self.usernamelist):
            processdict['user' + str(index+1) + 'name'] = self.usernamelist[index]
            processdict['user' + str(index+1) + 'process'] = self.learning_process[index]+1
        processdict['usernum'] = self.usernum
        return processdict

    def nextWord(self,username):
        index=self.usernamelist.index(username)
        if self.learning_process[index]==49:
            return False
        self.learning_process[index]+=1
        self.processchanged=True
        return self.wordlist[self.learning_process[index]]

    def lastWord(self,username):
        index = self.usernamelist.index(username)
        if self.learning_process[index]==0:
           return (self.wordlist[0],0)
        self.learning_process[index] -= 1
        self.processchanged=True
        return (self.wordlist[self.learning_process[index]],1)

    def startStudy(self): #房间等待界面, 房主开始
        for username in self.usernamelist:
           localUpdateHistory(username,self.allwordstring)
        return self.wordlist[0]

    def checkUser(self):  # 房间等待界面, 获取房间内用户
        userdict = {}
        for index, name in enumerate(self.usernamelist):
            userdict['user' + str(index + 1)] = self.usernamelist[index]
        userdict['usernum'] = self.usernum
        return userdict

    def speak(self,username,str):
        self.talknum+=1
        self.talkstring = self.talkstring + username + ':\n' + str+'\n'
        self.talkchanged=True
        return True

    def checkTalk(self):
        dic = {}
        dic['str'] = self.talkstring
        return dic

class ReviewRoom: #复习房间类
    alllist=allWordList()

    def __init__(self, roomID,hostname):
        self.roomID = roomID
        self.usernum = 1
        self.usernamelist = [hostname]
        self.hostname = hostname
        self.score =[0]
        self.wordlist = []
        self.correctanswer=[]
        self.currentquestion=-1
        self.problemlist=[]
        self.start=False
        self.alreadyanswer = [0]
        self.alreadyright=0
        self.temp=0
        self.talknum = 0
        self.talkstring = ' '
        self.allwordstring = ''  # 用于更新用户学习记录
        self.scorechanged=False
        self.end=False
        self.talkchanged=False
        self.usernumchanged=False

    def setWordList2(self):
        self.wordlist = pastWordList(convert_name_to_id(self.hostname))
        self.reviewlist = random.sample(self.wordlist,30)

    def setWordList(self,idlist):
        if self.wordlist!=[]:
            return
        idlist = randomIdList()
        for i in idlist:
            worddict = ReviewRoom.alllist[i - 1]
            self.wordlist.append(worddict)
            self.allwordstring = self.allwordstring + worddict['Word'] + ' '
        #printe(self.wordlist,EN)

    def setProblemList(self): #已经选定单词，生成题目
        if self.problemlist!=[]:
            return
        for word in self.wordlist:
            choicelist=[]   #选项列表
            choiceidlist=[] #选项ID列表
            choicedict={} #题目词典
            id=word['ID']
            w=word['Word']
            meaning=word['meaning']
            #printe(meaning,EN)
            choicedict['word']=w
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
            correct_id_index=choiceidlist.index(id)
            self.correctanswer.append(correct_id_index+1)
            for index,id in enumerate(choiceidlist):
                choicedict['answer'+str(index+1)]=ReviewRoom.alllist[id-1]['meaning']
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
            self.alreadyanswer.append(0)
            #self.currentquestion.append(0)
            userdict={}
            userdict['roomid'] = self.roomID
            for index, username in enumerate(self.usernamelist):
                userdict['user' + str(index+1)] = username
            self.usernumchanged=True
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
            self.alreadyanswer.pop(index_to_delete)
            #self.currentquestion.pop(index_to_delete)
            printe(self.usernamelist,EN)
            self.usernumchanged=True
            return 1

    def returnReviewScore(self):
        scoredict={}
        for index, name in enumerate(self.usernamelist):
            scoredict['user'+str(index+1)+'name']=self.usernamelist[index]
            scoredict['user'+str(index+1)+'score']=self.score[index]
        scoredict['usernum']=self.usernum
        self.scorechanged=False
        return scoredict

    def startReview(self): #房间等待界面, 房主开始
        self.start = True
        return self.problemlist[0]

    def checkStart(self): #用于房间等待界面, 非房主检测是否开始
        if self.start==False:
            return 0
        else:
            return 1

    def checkUser(self): #房间等待界面, 获取房间内用户
        userdict={}
        for index, name in enumerate(self.usernamelist):
            userdict['user' + str(index + 1) ] = self.usernamelist[index]
        userdict['usernum'] = self.usernum
        printe(userdict,EN)
        if self.start==False:
            userdict['start']=0
        else:
            userdict['start']=1
        return userdict

    def calculateScore(self,username,choice):
        index=self.usernamelist.index(username)
        if self.alreadyanswer[index]==1:
            return  (0,self.correctanswer[self.currentquestion])
        else:
            self.alreadyanswer[index]=1
            if choice!=self.correctanswer[self.currentquestion]:
                return (0,self.correctanswer[self.currentquestion])
            else:
                yourscore=10-2*self.alreadyright
                self.score[index]+=yourscore
                self.alreadyright+=1
                printe(self.score,EN)
                if yourscore>0:
                    self.scorechanged=True
                return (yourscore,self.correctanswer[self.currentquestion])

    def nextProblem(self,username):
        #index = self.usernamelist.index(username)
        if self.currentquestion==49:
            index=0
            tempscore=[]
            tempbool=[]
            for i in range (self.usernum):
                tempscore.append(self.score[i])
                tempbool.append(True)
            tempscore.sort(reverse=True)
            scoredict = {}
            for tscore in tempscore:
                for j in range (self.usernum):
                    if self.score[j]==tscore and tempbool[j]==True:
                        tempbool[j]=False
                        index+=1
                        scoredict['user' + str(index ) + 'name'] = self.usernamelist[j]
                        scoredict['user' + str(index ) + 'score'] = self.score[j]
                        break
            scoredict['usernum'] = self.usernum
            self.end=True
            return (scoredict,1)
        self.temp+=1
        self.temp=self.temp%(self.usernum*2)
        if self.temp==1:
            self.currentquestion+=1
            self.alreadyright=0
            for i,x in enumerate(self.alreadyanswer):
                self.alreadyanswer[i]=0
        #print('temp',self.temp)
        #print ('current',self.currentquestion)
        #print(username,self.problemlist[self.currentquestion])
        return (self.problemlist[self.currentquestion],2)

    def speak(self, username, str):
        self.talknum += 1
        self.talkstring = self.talkstring + username + ':\n' + str+'\n'
        self.talkchanged=True
        return True

    def checkTalk(self):
        dic={}
        dic['str']=self.talkstring
        return dic
