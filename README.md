# START! - EI333 Software Engineering Project

START! 即Study Together And Review Together!

## 成员

前端：史历（负责人）、喻智勇、张世康

后端：万新熠（*组长*&负责人）、郎伟临、田亚博

## 时间表

5月23日截止！！！！

## How to run?

1. In `frontend` directory, type

```bash
npm start
```

2. In `backend` directory, type

```bash
python3 manage.py runserver
```

3. In your browser, visit

```
http://localhost:3000
```

## MySQL搭建方法

1. 若没有安装MySQL，请前往此网址下载。安装时最好在设置root密码界面（root密码可自己任取），点击右下方add User添加一个用户，用户名为start, 密码为start，权限db admin。也可在安装完成后使用命令行之后新建一个start用户并给予权限。(已安装请跳过此步)
```
https://dev.mysql.com/downloads/file/?id=495322
```

2. 打开MySQL Workbench，点击MySQL Connections右侧加号创建新项目

![](https://raw.githubusercontent.com/rikosellic/IMAGE/master/mysql_workbench.png)

3. Connection Name任取, Usename填写start, 点击password栏 Store in Valtu..按钮, password填写start，点击ok 。点击Test connection确保创建成功。（若失败可能是MySQL没有正确安装）再点击ok完成项目创建。

  4. 点进此图标![](https://raw.githubusercontent.com/rikosellic/IMAGE/master/%E5%88%9B%E5%BB%BA%E5%BA%93.png)创建一个新数据库。数据库名为django_mysql， 点击Apply。

  5. 确保本地仓库已经更新。

  6. 确保pymysql库已安装。

  7. 运行（使用Pycharm,修改相应Parameters也可）

     ```
     python manage.py makemigrations
     python manage.py migrate
     ```

8. 重新创建Django管理员，运行

   ```
   python manage.py createsuperuser
   ```

   设置用户名为start,密码为start（无需注意警告,yes即可）