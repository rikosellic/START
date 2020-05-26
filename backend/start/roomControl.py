from .concreteclass import StudyRoom, ReviewRoom
import random

EN=1
def printe(str,EN):
    if(EN==1):
        print(str)
    return

class RoomControl:
    def __init__(self):
        self.StudyRoomDict={}
        self.ReviewRoomDict={}

    def checkRoom(self,id): #检查房间是否存在
        if id in self.StudyRoomDict.keys()  :
            return 1
        elif id in self.ReviewRoomDict.keys():
            return 2
        else:
            return False

    def createStudyRoom(self,username): #创建学习房间
        try:
            while(True):
                roomID=random.randint(100000,999999)
                if not self.checkRoom(roomID):
                    break
            room=StudyRoom(roomID,username)
            self.StudyRoomDict[roomID]=room
            return roomID
        except Exception as e:
            print(e)
            return 0

    def createReviewRoom(self, username):  # 创建复习房间
        try:
            while (True):
                roomID = random.randint(100000, 999999)
                if not self.checkRoom(roomID):
                    break
            room = ReviewRoom(roomID, username)
            self.ReviewRoomDict[roomID] = room
            return roomID
        except Exception as e:
            print(e)
            return 0

    def enterRoom(self,username,roomid):
        try:
            if self.checkRoom(roomid)==1:
                result=self.StudyRoomDict[roomid].enterRoom(username)
                result['type']=0
                return result
            elif self.checkRoom(roomid)==2:
                result = self.ReviewRoomDict[roomid].enterRoom(username)
                result['type'] = 1
                return result
            else:
                return 0
        except Exception as e:
            print(e)
            return 0


    def quitStudyRoom(self, username, roomid):
        try:
            if(self.StudyRoomDict[roomid].quitRoom(username)==2):
                self.StudyRoomDict.pop(roomid)
            return 1
        except Exception as e:
            print(e)
            return 0

    def quitReviewRoom(self, username, roomid):
        try:
            if(self.ReviewRoomDict[roomid].quitRoom(username)==2):
                self.ReviewRoomDict.pop(roomid)
            return 1
        except Exception:
            return 0

    def setReviewProblem(self,roomid):
        try:
            self.ReviewRoomDict[roomid].setWordList([])
            self.ReviewRoomDict[roomid].setProblemList()
            return 1
        except Exception as e:
            print (e)
            return 0

    def startStudy(self,roomid):
        try:
            result=self.StudyRoomDict[roomid].startStudy()
            return result
        except Exception as e:
            print(e)
            return 0

    def studyCheckStart(self,roomid):
        try:
            result = self.StudyRoomDict[roomid].checkStart()
            return result
        except Exception as e:
            print(e)
            return 2

    def studySetWordList(self,roomid):
        try:
            self.StudyRoomDict[roomid].setWordList([])
            return True
        except Exception as e:
            print(e)
            return False

    def nextWord(self,roomid,username):
        try:
            result=self.StudyRoomDict[roomid].nextWord(username)
            if result==False:
                return -1
            return result
        except Exception as e:
            print(e)
            return False

    def lastWord(self,roomid,username):
        try:
            result=self.StudyRoomDict[roomid].lastWord(username)
            return result
        except Exception as e:
            print(e)
            return (False,0)

    def startReview(self,roomid):
        try:
            result=self.ReviewRoomDict[roomid].startReview()
            return result
        except Exception as e:
            print(e)
            return 0

    def reviewCheckStart(self,roomid):
        try:
            result = self.ReviewRoomDict[roomid].checkStart()
            return result
        except Exception as e:
            print(e)
            return 2

    def calculateScore(self,username,roomid,choice):
        try:
            result=self.ReviewRoomDict[roomid].calculateScore(username,choice)
            return result
        except Exception as e:
            print(e)
            return -1

    def nextProblem(self,roomid,username):
        try:
            result=self.ReviewRoomDict[roomid].nextProblem(username)
            return result
        except Exception as e:
            print(e)
            return (False,0)

    def returnStudyProcess(self,roomid):
        try:
            result=self.StudyRoomDict[roomid].returnStudyProcess()
            printe(result,EN)
            return result
        except Exception as e:
            print(e)
            return False

    def returnReviewScore(self, roomid):
        try:
            result = self.ReviewRoomDict[roomid].returnReviewScore()
            printe(result,EN)
            return result
        except Exception as e:
            print(e)
            return False

    def studyWaitCheckUser(self,roomid):
        try:
            result= self.StudyRoomDict[roomid].checkUser()
            return result
        except Exception as e:
            print(e)
            return False

    def reviewWaitCheckUser(self,roomid):
        try:
            result= self.ReviewRoomDict[roomid].checkUser()
            return result
        except Exception as e:
            print(e)
            return False