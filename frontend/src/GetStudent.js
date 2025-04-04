import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GetStudent() {

    const navigate=useNavigate()
    const [id,setId]=useState()
    const [error,setError]=useState('')
    const [student,setStudent]=useState({
            "id":"",
            "name":"",
            "branch":"",
            "sem":0,
            "dob":"",
            "address":"",
            "cgpa":0.0
        })

    const handleChange = (event)=>{
        setId(Number(event.target.value))
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.get('http://127.0.0.1:8000/api/students/'+id)
       .then((res)=>{
            setStudent(res.data)
            setError('')
            
            console.log(student)
       }) 
       .catch((err)=>{
            setError("Not found")
           setStudent({
            "id":"",
            "name":"",
            "branch":"",
            "sem":0,
            "dob":"",
            "address":"",
            "cgpa":0.0
        })
       })
    }

    const deleteStudent = (event)=>{
        event.preventDefault()
        axios.delete('http://127.0.0.1:8000/api/students/'+id)
       .then((res)=>{
        setStudent({
                "id":"",
                "name":"",
                "branch":"",
                "sem":0,
                "dob":"",
                "address":"",
                "cgpa":0.0
            })
            window.alert("Deleted successfully!!")
            setError('')
       }) 
       .catch((err)=>{
            setError("Not found")           
       })
    }
    const updateFun = (event)=>{
        console.log('in')
        navigate('/update/'+student.id)
    }

    return (
        <div className='card mt-2 col-md-5 offset-4'>
            <h3 className='text-center'>Get Student</h3>
            <div className='card-body'>                
                <div>
                    <label ><strong>Student Id</strong></label>
                    <input type='text' className='form-control' value={id} onChange={handleChange} />
                </div>
                <br/>                
                <div className='text-center mb-2'>
                    <button className='btn btn-success' onClick={handleSubmit}>Get</button>
                </div>
                { 
                    student.id ? 
                    
                    <div className='text-start'>
                        <p>Id       : {student.id}</p> 
                        <p>Name     : {student.name}</p> 
                        <p>Branch   : {student.branch}</p> 
                        <p>Semester : {student.sem}</p>
                        <p>DOB      : {student.dob}</p>
                        <p>Address  : {student.address}</p>
                        <p>CGPA     : {student.cgpa}</p>
                        <button className='btn btn-danger' onClick={deleteStudent}>Delete</button>
                        <button className='btn btn-success' onClick={updateFun}>Update</button>
                    </div> 
                    :
                    <p>{error}</p> 
                }
            </div>        
        </div>
  )
}
