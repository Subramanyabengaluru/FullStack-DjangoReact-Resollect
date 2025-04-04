from django.urls import path
from . import views

urlpatterns = [
    path('api/students/<int:id>',views.student_operations,name='student_operations'),
    path('api/students/',views.student_list,name='student_list'),
]