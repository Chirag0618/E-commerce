import React, { useEffect, useState } from 'react'
import { getAllUsers, updateAdmin } from '../../api/userAPI'

const Users = () => {

    let [users, setUsers] = useState([])
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        getAllUsers()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setUsers(data)
                    setSuccess(false)
                }
            })
    }, [success])

    const handleRemoveAdmin = (id, role) => e => {
        e.preventDefault()
        updateAdmin(id, role)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setSuccess(true)
            }
        })

    }

    const handleMakeAdmin = (id, role) => e =>{
        e.preventDefault()
        updateAdmin(id, role)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setSuccess(true)
            }
        })
    }

    return (
        <div className='p-5'>
            <h1>Users</h1>

            <table className='table table-bordered text-center'>
                <thead className='table-dark'>
                    <tr>
                        <td>S.No.</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>isAdmin</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 &&
                        users.map((user, i) => {
                            return <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role ? 'Yes' : 'No'}</td>
                                <td>{user.role ? <button className='btn btn-danger' onClick={handleRemoveAdmin(user._id, 0)}>Remove Admin</button> : <button className='btn btn-success' onClick={handleMakeAdmin(user._id, 1)}>Make Admin</button>}</td>
                            </tr>
                        })
                    }
                </tbody>

            </table>

        </div>
    )
}

export default Users
