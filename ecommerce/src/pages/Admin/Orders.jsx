import React, { useEffect, useState } from 'react'
import { getAllOrders, processOrder } from '../../api/ordersAPI'

const Orders = () => {

    let [orders, setOrders] = useState([])
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        getAllOrders()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setOrders(data)
                    setSuccess(false)
                }
            })
    }, [success])

    const handleProcessOrder = (id, status) => e => {
        e.preventDefault()
        processOrder(id, status)
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
            <h1>
                Orders
            </h1>
            {
                orders.length > 0 &&
                orders.map(order => {
                    return <div key={order._id} className='p-5 border rounded my-3 shadow'>
                        Order ID: {order._id}
                        <br />
                        Order Placed By: {order.user?.username}
                        <br />
                        Order Placed On: {order.createdAt}
                        <br />
                        Order Status: {order.status}
                        <br />
                        <div className="d-flex my-3">

                            <button disabled={order.status != 'pending'} className='mx-3 btn btn-success' onClick={handleProcessOrder(order._id, 'processing')}>
                                PROCESS ORDER
                            </button>

                            <button disabled={order.status != 'processing'} className='mx-3 btn btn-warning' onClick={handleProcessOrder(order._id, 'delivering')}>DELIVERING</button>

                            <button disabled={order.status != 'delivering'} className='mx-3 btn btn-info' onClick={handleProcessOrder(order._id, 'completed')}>COMPLETED</button>

                            <button disabled={order.status == 'cancelled' || order.status == "completed"} className='mx-3 btn btn-danger' onClick={handleProcessOrder(order._id, 'cancelled')}>CANCELLED</button>

                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default Orders
