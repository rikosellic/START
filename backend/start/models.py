from django.db import models


# Create your models here.

# add this
'''
class Todo(models.Model):
    title = models.CharField('title',max_length=120)
    description = models.TextField('description')
    completed = models.BooleanField('completed',default=False)

    class Meta:
        db_table = 'Todo'

    def _str_(self):
        return self.title
'''
class User(models.Model):
    """
    创建如下几个表的字段
    """
    # 用户ID : 该字段为主键
    userID = models.IntegerField('userID', primary_key=True)
    # 用户名  最大长度20 唯一 不能为空
    username = models.CharField('username', max_length=20, unique=True,null=False)
    # 密码  最大长度 不能为空
    password = models.CharField('password', max_length=20,null=False)
    # 邮箱 最大长度30 唯一 不能为空
    email = models.CharField('email', max_length=30, unique=True, null=False)
    # 学习目标 最大长度100
    goal = models.CharField('goal',  max_length=100,null=True)


    class Meta:
        db_table = 'User'

    def _str_(self):
        return self.userID