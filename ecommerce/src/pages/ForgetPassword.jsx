import React, { useState } from 'react'
import { forgetPassword } from '../api/userAPI'

const ForgetPassword = () => {
    let [email, setEmail] = useState('')

    const handleSubmit = e =>{
        e.preventDefault()
        forgetPassword(email)
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
        <h3 className='text-center'>Forget Password</h3>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" className='form-control mb-3' onChange={e=>setEmail(e.target.value)}/>
        <button className='btn btn-warning w-100' onClick={handleSubmit}>Forget Password</button>
    </form>
      
    </>
  )
}

export default ForgetPassword

