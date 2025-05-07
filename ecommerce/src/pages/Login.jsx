import React, { useState } from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { authenticate, login } from '../api/userAPI'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password})
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                authenticate(data)
                // alert("Login Successful")
                if(data.user.role === 1){
                    navigate('/')
                }
                else{
                    navigate('/')
                }
            }
        })
        
    }
    return (
        <Formik initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .max(20, 'Must Be Less Than 20 Letters')
                    .min(3, 'Must Be Greater than 3 Letters')
                    .matches(/^[a-zA-Z]+$/, 'Must Be Letters')
                    .required('First Name is Mandatory'),

                // lname: Yup.string()
                //     .max(20, 'Must Be Less Than 20 Letters')
                //     .min(3, 'Must Be Greater than 3 Letters')
                //     .matches(/^[a-zA-Z]+$/, 'Must Be Letters')
                //     .required('Last Name is Mandatory'),

                email: Yup.string()
                    // .email('Invalid Email')
                    .matches(/^([a-zA-Z])[a-zA-Z0-9\-\.\_]+\@+([a-zA-Z])+\.+([a-z])/, 'Invalid Email')
                    .required('Email is Mandatory'),

                pwd: Yup.string()
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$*!?]).{8,}$/, 'Weak Password')
                    .required('Password is Mandatory')

            })}>
            <div className="container">
                <div className="d-md-flex justify-content-evenly">
                    <div className="col-md-5">
                        <Form className="p-3 rounded-4 shadow mt-5" onSubmit={handleSubmit}>
                            <h3 className="text-center text-warning bg-warning-subtle rounded-4">Login</h3>
                            <hr />
                            
                            

                            <div className="form-floating mb-3">
                                <Field type="email" placeholder="" className="form-control" name='email' id='email' required onChange={e=>setEmail(e.target.value)} value={email}/>
                                <label htmlFor="email" className="ms-3">Email Address</label>
                                <ErrorMessage name='email'>
                                    {
                                        msg => <span className='text-danger'>{msg}</span>
                                    }
                                </ErrorMessage>
                            </div>

                            <div className="form-floating mb-3">
                                <Field type="password" placeholder="" className="form-control" name='password' id='password' required onChange={e=>setPassword(e.target.value)} value={password}/>
                                <label htmlFor="password" className="ms-3">Password</label>
                                <ErrorMessage name='password'>
                                    {
                                        msg => <span className='text-danger'>{msg}</span>
                                    }
                                </ErrorMessage>
                            </div>
                            <hr />
                            <div className="mb-3 w-52 m-auto">
                                <input type="submit" value="Register" className="form-control bg-primary" />
                            </div>


                            <hr />
                            <small>Do Not Have An Account?<Link to="/signup" className='ms-2'>Sign Up </Link></small>
                        </Form>
                    </div>


                    <div className="col-md-4">
                        <img src="images/logo.jpg" alt="" width="100%" height="100%" />
                    </div>
                </div>
            </div>

        </Formik>
    )
}

export default Login
