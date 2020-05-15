from .concreteclass import StudyRoom, ReviewRoom
import random

class RoomControl:
    def __init__(self):
        self.StudyRoomDict={}
        self.ReviewRoomDict={}

    def checkRoom(self,id): #检查房间是否存在
        if id in self.StudyRoomDict.keys() or id in self.ReviewRoomDict.keys():
            return False
        else:
            return True

    def createStudyRoom(self,username): #创建学习房间
        try:
            while(True):
                roomID=random.randint(100000,999999)
                if not self.checkRoom(roomID):
                    break
            room=StudyRoom(roomID,username)
            self.StudyRoomDict[roomID]=room
            return 1
        except Exception:
            return 0

    def createReviewRoom(self, username):  # 创建复习房间
        try:
            while (True):
                roomID = random.randint(100000, 999999)
                if not self.checkRoom(roomID):
                    break
            room = ReviewRoom(roomID, username)
            self.ReviewRoomDict[roomID] = room
            return 1
        except Exception:
            return 0

    def enterStudyRoom(self,username,roomid):
        try:
            if self.checkRoom(roomid):
                self.StudyRoomDict[roomid].enterRoom(username)
                return 1
            else:
                return 0
        except Exception:
            return 0

    def enterReviewRoom(self, username, roomid):
        try:
            if self.checkRoom(roomid):
                self.ReviewRoomDict[roomid].enterRoom(username)
                return 1
            else:
                return 0
        except Exception:
            return 0

    def quitStudyRoom(self, username, roomid):
        try:
            if(self.StudyRoomDict[roomid].quitRoom(username)==2):
                self.StudyRoomDict.pop(roomid)
            return 1
        except Exception:
            return 0

    def quitReviewRoom(self, username, roomid):
        try:
            if(self.ReviewRoomDict[roomid].quitRoom(username)==2):
                self.ReviewRoomDict.pop(roomid)
            return 1
        except Exception:
            return 0