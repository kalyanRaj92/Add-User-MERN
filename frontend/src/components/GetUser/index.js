import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

import "./index.css"

const GetUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        const fetchedData = async() =>{
            const res = await axios.get("https://mern-add-user.onrender.com/api/getall");
            setUsers(res.data);
        }
        fetchedData();
    },[])

    const deleteUser = async(userId)=>{
        await axios.delete(`https://mern-add-user.onrender.com/api/delete/${userId}`)
        .then((res)=> {
           setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
           toast.success(res.data.message);
          })
          .catch((err)=> toast.error(err))
    }
  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'><i className="fa-solid fa-plus"></i> Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='actionButtons'>
                                    <button onClick={()=>deleteUser(user._id)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                    <Link to={`/edit/${user._id}`} className='editButton'>
                                        <i className='fa-solid fa-pen-to-square'></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default GetUser