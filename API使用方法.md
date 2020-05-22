# API使用方法

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

 

## 加入学习房间

**URL**:api/enterstudyroom

**方法**:POST

**输入**: "username"，"roomid"（房间号）

**返回值**: 成功: 一个字典,包括"roomid"(房间号),"user1"(用户1的用户名,此人是房主),"user2"(用户2的用户名),以此类推,有几个人显示几个， 状态 HTTP_200_OK

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

 

## 加入复习房间

**URL**:api/enterreviewroom

**方法**:POST

**输入**: "username"，"roomid"（房间号）

**返回值**: 成功: 一个字典,包括"roomid"(房间号),"user1"(用户1的用户名,此人是房主),"user2"(用户2的用户名),以此类推,有几个人显示几个， 状态 HTTP_200_OK

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

**返回值**: 未开始:返回false, 状态: HTTP_200_OK

​			开始了: 返回第一个单词的字典, 包括"ID","Word"(单词),"meaning"(释义),"lx"(例句)，状态:HTTP_200_OK

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

第一题不能上一题: 状态HTTP_501_NOT_IMPLEMENTED

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

**返回值**: 未开始:返回false, 状态: HTTP_200_OK

​			开始了: 第一题的字典, 包括Word"(单词),"answer1"(选项1),"answer2","answer3","answer4",状态:HTTP_200_OK

​			失败: 状态HTTP_400_BAD_REQUEST



## 提交选项

**复习页面，用户点击选项时调用, 返回他此题的分数**

**URL**:api/calculatescore

**方法**:POST

**输入**:"roomid","username","choice"(用户所选择的选项的**完整的字符串**)

**返回值**: 成功：用户此题的得分(0-10的整数), 状态HTTP_200_OK

​			失败:状态HTTP_400_BAD_REQUEST



## 下一个问题

**复习页面十秒倒计时到了自动调用**

**URL**:api/nextproblem

**方法**:POST

**输入:**"roomid"

**返回值**:  成功：下一题的字典， 包括Word"(单词),"answer1"(选项1),"answer2","answer3","answer4",状态:HTTP_200_OK

已经到最后一题: 用户得分的字典,key是用户名, value是他的总得分(可能要改)，状态HTTP_202_ACCEPTED

失败: 状态HTTP_400_BAD_REQUEST