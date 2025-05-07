import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="container-fluid">
        <div className="row">

        <div className="col-11 mx-auto col-md-4" >
            <AdminSidebar/>
        </div>
        <div className="col-11 mx-auto col-md-8" >
            <Outlet/>
        </div>

        </div>

    </div>
    
  )
}

export default AdminLayout
