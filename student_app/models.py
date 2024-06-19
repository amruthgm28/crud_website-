from django.db import models

class student(models.Model):
    name=models.CharField(max_length=266)
    address=models.CharField(max_length=268)
    fee=models.IntegerField()

# Create your models here.
