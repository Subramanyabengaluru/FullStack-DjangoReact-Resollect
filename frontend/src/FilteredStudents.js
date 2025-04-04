import React, { useState } from 'react'
import axios from 'axios'

export default function FilteredStudents() {

    const [branch,setBranch]=useState('')

    const [students,setStudents] = useState([])
    const handleChange = (event)=>{
        setBranch(event.target.value)
    }

    const filterFun = (event)=>{
      axios.get('http://127.0.0.1:8000/api/students/?branch='+branch)
      .then((res)=>{
           setStudents(res.data)
           console.log(res.data)
      }) 
      .catch((err)=>{
           console.log(err)
      })
    }

  return (
    <div>
      <div className='col-4'>
        <h4>Branch</h4>
        <select onChange={handleChange} className='form-control' name='branch' value={branch}>
            <option value='' disabled>--Select--</option>
            <option value='CSE'>Computer Science Engineering</option>
            <option value='EEE'>Electrical Engineering</option>
            <option value='ECE'>Electronics & Communication Engineering</option>
            <option value='ME'>Mechanical Engineering</option>
        </select>
        <button className='btn btn-success' onClick={filterFun}>Filter</button>
      </div>
      <div className='table-responsive mt-4'>
        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>CGPA</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((stud,ind)=>{
                return (
                  <tr>
                    <td>{stud.id}</td>
                    <td>{stud.name}</td>
                    <td>{stud.sem}</td>
                    <td>{stud.branch}</td>
                    <td>{stud.cgpa}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
