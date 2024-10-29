import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [data , setData ] = useState([])
    const navigate = useNavigate()
    
    
    const handleSubmit=(e)=>{
        e.preventDefault();

    const detail = {id :Date.now(), name,email}

    const storedData = JSON.parse(localStorage.getItem('userData')) || []
    const updateData = [...storedData,detail]
    localStorage.setItem('userData',JSON.stringify(updateData))
     setData(updateData)
     
     navigate('/selectpage')
     setName('')
     setEmail('')
    }
  return (
      <div className='quiz-container'>
      <h2>Login Here!</h2>

      <input type="text"
      placeholder='Enter Name' 
      value={name}
      onChange={(e)=>setName(e.target.value)}/>

      <input type="text"
      placeholder='Enter Email' 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}/>

      <button onClick={handleSubmit}> Submit</button>
      
    </div>
  )
}

export default Login