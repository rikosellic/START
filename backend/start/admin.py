from django.contrib import admin
from .models import *  # add this


# Register your models here.


#class TodoAdmin(admin.ModelAdmin):  # add this
    #list_display = ('title', 'description', 'completed')  # add this

class UserAdmin(admin.ModelAdmin):  # add this
    list_display = ('userID', 'username', 'password','email','goal')  # add this

# Register your models here.
#admin.site.register(Todo, TodoAdmin)  # add this
admin.site.register(User, UserAdmin)  # add this
