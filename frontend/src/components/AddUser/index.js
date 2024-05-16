import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import "./index.css"
import toast from 'react-hot-toast'

const AddUser = () => {
  const navigate = useNavigate();

  const data = {
    name:"",
    email:"",
    password:"",
  }

  const [user, setUser] = useState(data)

  const inputHandler = (e)=>{
    setUser({...user, [e.target.name]:e.target.value})
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("https://mern-add-user.onrender.com/api/create", user)
    .then((res)=> {
      toast.success(res.data.message);
      navigate("/");
    })
    .catch((err)=> toast.error(err.response.data.message))
  }
  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name</label>
          <input value={user.name} 
            onChange={inputHandler}  
            type='text' 
            name='name' 
            id='name' 
            placeholder='Enter Name' 
            required/>
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input 
            value={user.email} 
            onChange={inputHandler}  
            type='email' 
            name='email' 
            id='email' 
            placeholder='Enter Email' 
            required/>
        </div>
        <div className='inputGroup'>
          <label htmlFor='password'>Password</label>
          <input 
            value={user.password} 
            onChange={inputHandler}  
            type='password' 
            name='password' 
            id='password' 
            placeholder='Enter Password' 
            required/>
        </div>
        <div className='inputGroup'>
          <button type='submit'>ADD USER</button>
        </div>
      </form>
    </div>
  )
}

export default AddUser