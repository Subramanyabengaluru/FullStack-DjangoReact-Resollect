
import React, { useState } from 'react'
import axios from 'axios';

export default function AddStudent() {
  
    const [student,setStudent]=useState({
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
        axios.post('http://127.0.0.1:8000/api/students/',student)
        .then((res=>{
            setSuccess("Student created successfully with Id: "+res.data.id)
            
        }))
        .catch((err)=>{
            console.log(err)
            setError(err)
        })
    }
  

  return (
    <div className='row col-md-5 offset-3 mt-4'>
      <div className='card'>
        <h3 className='card-header text-center bg-primary mt-2 text-white'>Create Student </h3>
        <div className='card-body'>
            <form className='form' method='post' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='form-label'><strong>Name</strong></label>
                    <input type='text' className='form-control' name='name' id='name' required value={student.name} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>Branch</strong></label>
                    <select onChange={handleChange} className='form-control' name='branch' value={student.branch}>
                        <option value='' disabled>--Select--</option>
                        <option value='CSE'>Computer Science Engineering</option>
                        <option value='EEE'>Electrical Engineering</option>
                        <option value='ECE'>Electronics & Communication Engineering</option>
                        <option value='ME'>Mechanical Engineering</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>Semester</strong></label>
                    <input type='number' className='form-control' name='sem' id='sem' min={1} max={8} required value={student.sem} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='form-label'><strong>DOB</strong></label>
                    <input type='date' className='form-control' name='dob' id='dob' required value={student.dob} onChange={handleChange} />
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
                    <button className='btn btn-success'>Submit</button>
                </div>
                <p className='text-success'>{success}</p>
            </form>
        </div>
      </div>
    </div>
  )
}
