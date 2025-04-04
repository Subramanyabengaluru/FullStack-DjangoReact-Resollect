
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function UpdateStudent() {

    const param = useParams()

    const [student,setStudent]=useState({
        "id":"",
        "name":"",
        "branch":"",
        "sem":0,
        "dob":"",
        "address":"",
        "cgpa":0.0
    })

    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')

    const handleChange = (event)=>{
        const {name,value}=event.target
        setStudent(prev=>({...prev,[name]:value}))
        console.log(event)
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.put('http://127.0.0.1:8000/api/students/'+student.id,student)
        .then((res=>{
            setSuccess("Student updated successfully ")
            console.log(success)
        }))
        .catch((err)=>{
            console.log(err)
            setError(err)
        })
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/students/'+param.id)
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
    },[])
  
  return (
    <div className='row col-md-5 offset-3 mt-4'>
      <div className='card'>
        <h3 className='card-header text-center bg-primary mt-2 text-white'>Update Student </h3>
        <div className='card-body'>
            <form className='form' method='post' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='form-label'><strong>Student Id</strong></label>
                    <input type='text' className='form-control' name='id' id='id' required value={student.id} onChange={handleChange} readOnly/>
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>Name</strong></label>
                    <input type='text' className='form-control' name='name' id='name' required value={student.name} onChange={handleChange} readOnly />
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>Semester</strong></label>
                    <input type='text' className='form-control' name='sem' id='sem' min={1} max={8} required value={student.sem} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>DOB</strong></label>
                    <input type='date' className='form-control' name='dob' id='dob' required value={student.dob} onChange={handleChange} readOnly />
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>Address</strong></label>
                    <input type='text' className='form-control' name='address' id='address' required value={student.address} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>CGPA</strong></label>
                    <input type='number' className='form-control' name='cgpa' id='cgpa' required value={student.cgpa} onChange={handleChange}/>
                </div>
                <div className='text-center mt-2'>
                    <button className='btn btn-success'>Update</button>
                </div>
                <p className='text-success'>{success}</p>
            </form>
        </div>
      </div>
      
    </div>
  )
}
