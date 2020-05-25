from django.db import models


# Create your models here.

# add this

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
	#登陆状态
	logined= models.BooleanField('logined', null=False, default=False)



	class Meta:
		db_table = 'User'

	def _str_(self):
		return self.userID

class Word(models.Model):
	"""
    创建如下几个表的字段
    """
	# 单词ID ： 该字段为主键
	ID = models.IntegerField('ID',primary_key=True)
	# 单词 唯一 不能为空
	Word = models.TextField('Word',unique=True,null=False)
	# 过去式 可以为空
	GQS = models.TextField('GQS',null=True)
	# 过去分词 可以为空
	GQFC = models.TextField('GQFC',null=True)
	# 现在分词 可以为空
	XZFC = models.TextField('XZFC',null=True)
	# 复数 可以为空
	FS = models.TextField('FS',null=True)
	# 单词释义 不能为空
	meaning = models.TextField('meaning',null=False)
	# 例句 可以为空
	lx = models.TextField('lx',null=True)
	
	
	class Meta:
		db_table = 'words'
		
	def _str_(self):
		return self.ID

class StudyData(models.Model):
	"""
    创建如下几个表的字段
    """
	# 用户ID ： 该字段为主键
	userID = models.IntegerField('userID',primary_key=True)
	# 单词ID 唯一 可以为空
	ID = models.TextField('ID',unique=True,null=True)

	class Meta:
		db_table = 'studydata'
		
	def _str_(self):
		return self.userID