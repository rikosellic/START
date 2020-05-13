from django.contrib import admin
from .models import Todo,UserInfo  # add this


# Register your models here.


class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'description', 'completed')  # add this

class UserInfoAdmin(admin.ModelAdmin):  # add this
    list_display = ('userID', 'username', 'password','email','goal')  # add this

# Register your models here.
admin.site.register(Todo, TodoAdmin)  # add this
admin.site.register(UserInfo, UserInfoAdmin)  # add this
