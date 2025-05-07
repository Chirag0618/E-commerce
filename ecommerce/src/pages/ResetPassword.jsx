import React, { useState } from 'react'
import { resetpassword } from '../api/userAPI'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    let [password, setPassword] = useState('')

    let {token} = useParams()

    const handleSubmit = e =>{
        e.preventDefault()
        resetpassword(password, token)
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                alert(data.message)
            }
        })
    }

  return (
    <>
    <form className='w-50 p-5 mx-auto my-5 shadow-lg'>
        <h3 className='text-center'>Reset Password</h3>
        <label htmlFor="pwd">Password</label>
        <input type="text" id="pwd" className='form-control mb-3' onChange={e=>setPassword(e.target.value)}/>
        <button className='btn btn-warning w-100' onClick={handleSubmit}>Reset Password</button>
    </form>
      
    </>
  )
}

export default ResetPassword

