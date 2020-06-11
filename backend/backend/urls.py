"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from start import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/userinfomanagement',views.UserInfoManagement.as_view()),
    path('api/login', views.Login.as_view()),
    path('api/enterroom', views.EnterRoom.as_view()),
    path('api/createstudyroom',views.CreateStudyRoom.as_view()),
    path('api/quitstudyroom',views.QuitStudyRoom.as_view()),
    path('api/createreviewroom',views.CreateReviewRoom.as_view()),
    path('api/quitreviewroom',views.QuitReviewRoom.as_view()),
    path('api/setreviewproblem',views.SetReviewProblem.as_view()),
    path('api/startstudy',views.StartStudy.as_view()),
    path('api/studycheckstart',views.StudyCheckStart.as_view()),
    path('api/studysetwordlist',views.StudySetWordList.as_view()),
    path('api/nextword',views.NextWord.as_view()),
    path('api/lastword',views.LastWord.as_view()),
    path('api/startreview',views.StartReview.as_view()),
    path('api/reviewcheckstart',views.ReviewCheckStart.as_view()),
    path('api/calculatescore',views.CalculateScore.as_view()),
    path('api/nextproblem',views.NextProblem.as_view()),
    path('api/returnstudyprocess',views.ReturnStudyProcess.as_view()),
    path('api/returnreviewscore',views.ReturnReviewScore.as_view()),
    path('api/studywaitcheckuser',views.StudyWaitCheckUser.as_view()),
    path('api/reviewwaitcheckuser',views.ReviewWaitCheckUser.as_view()),
    path('api/studyroomspeak',views.StudyRoomSpeak.as_view()),
    path('api/reviewroomspeak',views.ReviewRoomSpeak.as_view()),
    path('api/studyroomchecktalk',views.StudyRoomCheckTalk.as_view()),
    path('api/reviewroomchecktalk',views.ReviewRoomCheckTalk.as_view()),
    path('api/getstudyrecord', views.GetStudyRecord.as_view())
]
