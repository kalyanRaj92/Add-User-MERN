import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

import "../AddUser/index.css"

const UpdateUser = () => {
  const navigate = useNavigate();

  const data = {
    name:"",
    email:"",
  }

  const [user, setUser] = useState(data);
  const {id} = useParams();

  const inputChangeHandler = (e)=>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  useEffect(()=>{
    axios.get(`https://mern-add-user.onrender.com/api/getOne/${id}`)
    .then((res)=>{
      setUser(res.data);
    })
    .catch((err)=> console.log(err));
  },[id])

  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`https://mern-add-user.onrender.com/api/update/${id}`,user)
    .then((res)=> {
      toast.success(res.data.message);
      navigate("/");
    })
    .catch((err)=> toast.error(err))
  }

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name</label>
          <input 
            value={user.name} 
            onChange={inputChangeHandler}  
            type='text' 
            name='name' 
            id='name' 
            placeholder='Enter Name' 
            autoComplete='off'/>
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input 
            value={user.email} 
            onChange={inputChangeHandler}  
            type='email' 
            name='email' 
            id='email' 
            placeholder='Enter Email' 
            autoComplete='off'/>
        </div>
        <div className='inputGroup'>
          <button type='submit'>UPDATE USER</button>
        </div>
      </form>
  </div>
  )
}

export default UpdateUser
