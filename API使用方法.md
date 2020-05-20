# API使用方法

## 登录

URL: api/login

方法: POST

输入: "username"(用户名), "passsword"(密码)

返回值: 成功: 状态HTTP_200_OK

​			  失败: 状态HTTP_401_UNAUTHORIZED



## 注册

URL: api/userinfomanagement

方法:POST

输入:"username"(用户名), "password"（密码）, "email"（邮箱）

返回值: 成功: 用户信息的字典, 包括"userID","username","password","email","goal"；状态HTTP_201_CREATED

​			 失败: 错误信息； 状态HTTP_400_BAD_REQUEST



## 创建学习房间

URL:api/createstudyroom

方法:POST

输入: "username"

返回值: 成功: 房间号(6位整数)；状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST

 

## 加入学习房间

URL:api/enterstudyroom

方法:POST

输入: "username"，"roomid"（房间号）

返回值: 成功: 状态 HTTP_200_OK(暂定, 应该还需要房间用户的列表)

​			 失败: 状态HTTP_400_BAD_REQUEST



## 退出学习房间

URL:api/quitstudyroom

方法:POST

输入: "username"，"roomid"（房间号）

返回值: 成功: 状态 HTTP_200_OK

​			 失败: 状态HTTP_400_BAD_REQUEST