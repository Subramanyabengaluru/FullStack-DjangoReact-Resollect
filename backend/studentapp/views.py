from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializer import StudentSerializer

# Create your views here.
@api_view(['POST','GET'])
def student_list(request):
        if request.method == 'POST':
            serializer = StudentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'GET':
            queryset = Student.objects.all()
            value = request.query_params.get('branch')
            serializer = StudentSerializer(queryset.filter(branch=value),many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
 
@api_view(['GET','DELETE','PUT'])
def student_operations(request,id):
    try:
        stud = Student.objects.get(id=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudentSerializer(stud)
        return Response(serializer.data,status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = StudentSerializer(stud,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if request.method == 'DELETE':
        stud.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)