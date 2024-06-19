from django.contrib import admin
from django.urls import path , re_path
# from django.conf.urls import url
from student_app import views

urlpatterns = [
   
    path('student', views.studentApi),
    path('student/<int:id>', views.studentApi),
    path('admin/', admin.site.urls),
]