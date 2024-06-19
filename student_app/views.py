from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from student_app.serializer import Studentserializer
from .models import student as StudentModel

@csrf_exempt
def studentApi(request,id=0):
    if request.method=='GET':
        students = StudentModel.objects.all()
        student_serializer=Studentserializer(students,many=True)
        return JsonResponse(student_serializer.data,safe=False)
    elif request.method=='POST':
        student_data=JSONParser().parse(request)
        student_serializer=Studentserializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        student_data=JSONParser().parse(request)
        student=student.objects.get(id=id)
        student_serializer=Studentserializer(student,data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        student=StudentModel.objects.get(id=id)
        student.delete()
        return JsonResponse("Deleted Successfully",safe=False)