import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
const Register = () => {
   const Navigate=useNavigate()
    const handleClick=()=>{
       Navigate("/login") 
    }
  return (
    <div className='register-container' >
    <div className='registerr'>
      <div className='name'>Register</div>
      <input placeholder='Username'/>
      
      <input placeholder='Email'/>
      <input placeholder='Password'/>
      <input placeholder='Confirm Password'/>
      <button className='re' onClick={()=>handleClick()}>Register</button>
      <div className='forget-password'>
        <div className='forget'>Forget-Password? </div>
      
        <div className='lo' onClick={()=>handleClick()} > ..Login</div>
      </div>
    </div>
    </div>
  )
}

export default Register
