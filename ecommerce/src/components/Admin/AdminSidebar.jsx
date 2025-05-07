import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../api/userAPI'

const AdminSidebar = () => {

    const navigate = useNavigate()

    const handleLogout = () =>{
        logOut()
        .then(data=>{
          console.log(data)
          navigate('/login')
        })
      }
    
    return (
        <div>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-secondary" style={{minHeight: "100vh"}} >
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    {/* <svg className="bi pe-none me-2" width="40" height="32"><use xlink:to="#bootstrap" /></svg> */}
                    <i className='bi bi-house'></i>
                    <span className="fs-4">E-com Nepal</span>
                </Link>
                <hr/>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to="#" className="nav-link active" aria-current="page">
                                {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#home" /></svg> */}
                                <i className='bi bi-house me-2'></i>

                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard" className="nav-link link-body-emphasis">
                                {/* svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#speedometer2" /></svg>< */}
                                <i className='bi bi-speedometer2 me-2'></i>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/orders" className="nav-link link-body-emphasis">
                                {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#table" /></svg> */}
                                <i className='bi bi-table me-2'></i>
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/category" className="nav-link link-body-emphasis">
                                {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#grid" /></svg> */}
                                <i className='bi bi-grid me-2'></i>
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/product" className="nav-link link-body-emphasis">
                                {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#grid" /></svg> */}
                                <i className='bi bi-grid me-2'></i>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user" className="nav-link link-body-emphasis">
                                {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#people-circle" /></svg> */}
                                <i className='bi bi-person-circle me-2'></i>
                                Users
                            </Link>
                        </li>
                    </ul>
                    <hr/>
                        <div className="dropdown">
                            <Link to="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/> */}
                                <i className='bi bi-person-circle me-2'></i>
                                    <strong>mdo</strong>
                            </Link>
                            <ul className="dropdown-menu text-small shadow">
                                
                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><span className="dropdown-item" onClick={handleLogout}>Sign out</span></li>
                            </ul>
                        </div>
                    </div>

            </div>
            )
}

            export default AdminSidebar
