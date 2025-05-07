import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../api/userAPI'
import { getMyOrders } from '../api/ordersAPI'
import { API } from '../config'

const Profile = () => {

    const { user } = isAuthenticated()
    let [orders, setOrders] = useState([])


    useEffect(()=>{
        getMyOrders(user._id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setOrders(data)
                console.log(data)
            }
        })
    },[])

    return (
        <div className='p-5'>
            <div className="p-5 border shadow-lg rounded-3">
                <h1 className='text-decoration-underline'>My Profile</h1>
                <h2 className='text-start'>Username: {user.username}</h2>
                <h2 className='text-start'>Email: {user.email}</h2>
            </div>

            <div className="p-5 border shadow-lg rounded-3 my-5">
                <h1 className='text-decoration-underline'>My Orders</h1>
                {
                    orders.length > 0 &&
                    orders.map(order=>{
                        return <div className='border rounded-3 shadow p-5 my-3'>
                            <h3>ORDER ID: {order._id}</h3>
                            <h3>Status: {order.status}</h3>

                            {
                                order.orderItems.length > 0 &&
                                order.orderItems.map(orderItem=>{
                                    console.log(orderItem)
                    
                                    return <div>
                                        <img src={`${API}/${orderItem.product?.product_image}`} alt={orderItem.product?.product_image} />
                                    </div>
                                })
                            }

                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default Profile
