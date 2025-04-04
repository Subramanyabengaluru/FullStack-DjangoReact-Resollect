from django.db import models

# Create your models here.
class Student(models.Model):
    name=models.CharField(max_length=100)
    branch=models.CharField(max_length=4)
    sem=models.IntegerField()
    dob=models.DateField()
    address=models.CharField(max_length=100)
    cgpa=models.DecimalField(max_digits=4,decimal_places=2)
