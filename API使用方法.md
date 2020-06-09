# API使用方法

## 测试版API

当views.py开头的TESTAPI=1时，将使用测试版API. 此时将自动创建一个有三人的学习房间和一个有三人的复习房间, 其中学习房间房主为'ZSK'，用户有'SL','YZY'; 复习房间房主为'WXY'，用户有'LWL','TYB‘，房间号随机，会在后端命令行中打印。 此时若调用以下API之一:上一个单词、下一个单词、下一题、提交答案、返回学习进度、返回当前分数、聊天系统, 将无需创建房间等前置操作,而可以直接使用，并且以POST方法访问这些API时, "roomid"字段仍然需要,但其值可以**随意填写(不能为空)**，系统将默认对事先创建的房间进行操作。

若要关闭此功能，将views.py中的TESTAPI值改为0即可。

## 登录

**URL**: api/login

**方法**: POST

**输入**: "username"(用户名), "passsword"(密码)

**返回值**: 成功: 状态HTTP_200_OK

​			  失败: 状态HTTP_401_UNAUTHORIZED



## 注册

**URL**: api/userinfomanagement

**方法**:POST

**输入**:"username"(用户名), "password"（密码）, "email"（邮箱）

**返回值**: 成功: 用户信息的字典, 包括"userID","username","password","email","goal"；状态HTTP_201_CREATED

​			 失败: 错误信息； 状态HTTP_400_BAD_REQUEST



## 创建学习房间

**URL**:api/createstudyroom

**方法**:POST

**输入**: "username"

**返回值**: 成功: 房间号(6位整数)；状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST

 

## 加入房间

**URL**:api/enterstudyroom

**方法**:POST

**输入**: "username"，"roomid"（房间号）

**返回值**: 成功: 一个字典,包括"roomid"(房间号),"type"(房间类型,0表示学习房间,1表示复习房间),"user1"(用户1的用户名,此人是房主),"user2"(用户2的用户名),以此类推,有几个人显示几个， 状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST



## 退出学习房间

**URL**:api/quitstudyroom

**方法**:POST

**输入**: "username"，"roomid"（房间号）

**返回值**: 成功: 状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST



## 创建复习房间

**URL**:api/createreviewroom

**方法**:POST

**输入**: "username"

**返回值**: 成功: 房间号(6位整数)；状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST

 



## 退出复习房间

**URL**:api/quitreviewroom

**方法**:POST

**输入**: "username"，"roomid"（房间号）

**返回值**: 成功: 状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST



## 设置复习房间问题

**URL**:api/setreviewproblem

**方法**:POST

**输入**:"roomid"

**返回值**：成功：状态 HTTP_200_OK

​			失败: 状态 HTTP_400_BAD_REQUEST



## 开始学习（房主）

**URL**:api/startstudy

**方法**:POST

**输入**:"roomid"

**返回值**: 成功: 第一个单词的字典, 包括"ID","Word"(单词),"meaning"(释义),"lx"(例句)，状态:HTTP_200_OK

失败: 状态HTTP_400_BAD_REQUEST



## 检查学习房间是否开始

**在学习房间等待页面, 非房主用户检测学习是否开始**

**URL**:api/studycheckstart

**方法**:POST

**输入**："roomid"

**返回值**: 未开始:返回0, 状态: HTTP_200_OK

​			开始了: 返回1，状态:HTTP_200_OK

​			失败: 状态HTTP_400_BADREQUEST



## 设置学习房间单词列表

**URL**:api/studysetwordlist

**方法**:POST

**输入**:"roomid"

**返回值**: 成功: 状态HTTP_200_OK

​			失败:HTTP_400_BAD_REQUEST



## 学习房间下一题

**URL**:api/nextword

**方法**:POST

**输入**:"roomid","username"

**返回值**: 成功: 下一个单词的字典,包括"ID","Word"(单词),"meaning"(释义),"lx"(例句)，状态:HTTP_200_OK

已经到了最后一题: 状态HTTP_501_NOT_IMPLEMENTED

失败:状态HTTP_400_BAD_REQUEST



## 学习房间上一题

**URL**:api/lastword

**方法**:POST

**输入**:"roomid","username"

**返回值**: 成功: 上一个单词的字典,包括"ID","Word"(单词),"meaning"(释义),"lx"(例句)，状态:HTTP_200_OK

第一题不能上一题: 第一个单词的字典，状态HTTP_501_NOT_IMPLEMENTED

失败:状态HTTP_400_BAD_REQUEST



## 开始复习（房主）

**URL**:api/startreview

**方法**:POST

**输入**:"roomid"

**返回值**: 成功: 第一题的字典, 包括Word"(单词),"answer1"(选项1),"answer2","answer3","answer4",状态:HTTP_200_OK

失败: 状态HTTP_400_BAD_REQUEST



## 检查复习房间是否开始

**在复习房间等待页面, 非房主用户检测学习是否开始**

**URL**:api/reviewcheckstart

**方法**:POST

**输入**："roomid"

**返回值**: 未开始:返回0, 状态: HTTP_200_OK

​			开始了: 返回1,状态:HTTP_200_OK

​			失败: 状态HTTP_400_BAD_REQUEST



## 提交选项

**复习页面，用户点击选项时调用, 返回他此题的分数**

**URL**:api/calculatescore

**方法**:POST

**输入**:"roomid","username","choice"(用户所选择的选项的编号1,2,3,4)

**返回值**: 成功：字典"score"用户此题的得分(0-10的整数),"correct"正确选项的数值(1-4整数) 状态HTTP_200_OK

​			失败:状态HTTP_400_BAD_REQUEST



## 下一个问题

**复习页面十秒倒计时到了自动调用**

**URL**:api/nextproblem

**方法**:POST

**输入:**"roomid","username"

**返回值**:  成功：下一题的字典， 包括Word"(单词),"answer1"(选项1),"answer2","answer3","answer4", "status":200, 状态:HTTP_200_OK

已经到最后一题: "usernum"(房间内用户人数), "user1name"(用户1的用户名),"user1score"(用户1当前的分数,整数),"user2name","user2process"..., "status":202，状态HTTP_202_ACCEPTED

失败: 状态HTTP_400_BAD_REQUEST



## 获取学习房间当前所有人的进度

URL:api/returnstudyprocess

方法:POST

输入:"roomid"

返回值:  成功:"usernum"(房间内用户人数), "user1name"(用户1的用户名),"user1process"(用户1当前的题目,1-50的整数),"user2name","user2process"..., 状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST



## 获取复习房间当前所有人的成绩

URL:api/returnreviewscore

方法:POST

输入:"roomid"

返回值:  成功:"usernum"(房间内用户人数), "user1name"(用户1的用户名),"user1score"(用户1当前的分数,整数),"user2name","user2process"..., 状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST



## 学习等待页面检查有哪些人

URL:api/studywaitcheckuser

方法:POST

输入:"roomid"

返回值:  成功:"usernum"(房间内用户人数), "user1"(用户1的用户名),,"user2"..., "start"(未开始0,已开始1) 状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST



## 复习等待页面检查有哪些人

URL:api/reviewwaitcheckuser

方法:POST

输入:"roomid"

返回值:  成功:"usernum"(房间内用户人数), "user1"(用户1的用户名),,"user2"...,"start"(未开始0,已开始1)  状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST



## 学习房间发消息

URL:api/studyroomspeak

方法:POST

输入:"roomid","username","str"(聊天内容)

返回值:  成功:  状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST





## 复习房间发消息

URL:api/reviewroomspeak

方法:POST

输入:"roomid","username","str"(聊天内容)

返回值:  成功:  状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST



## 学习房间检查聊天消息

URL:api/studyroomchecktalk

方法:POST

输入:"roomid"

返回值:  成功:一个字典，只有一个key:"str"(一整个字符串);状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST



## 复习房间检查聊天消息

URL:api/reviewroomchecktalk

方法:POST

输入:"roomid"

返回值:  成功:一个字典，只有一个key:"str"(一整个字符串);状态:HTTP_200_OK

失败: 状态:HTTP_400_BAD_REQUEST