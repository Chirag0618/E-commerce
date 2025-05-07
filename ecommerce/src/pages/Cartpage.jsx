import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { API } from '../config'
import { removeItemFromCart, updateCart } from '../redux/finalreducer/cartActions'
import {useNavigate} from 'react-router-dom'

const Cartpage = () => {

    let [total, setTotal] = useState(0)


    const cart_items = useSelector(store => store.cartStore.cart_items)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        let total = cart_items.reduceRight((acc, item) => (
            acc + item.product_price * item.quantity
        ), 0).toFixed(2)

        setTotal(total)
    }, [cart_items])

    const deleteItem = (cart_id) => {
        // const cart = JSON.parse(localStorage.getItem('cart'))
        // const newCart = cart.filter((item) => item.id !==cart_id);
        // localStorage.setItem("cart",JSON.stringify(newCart));
        // setCartItem(newCart);
        // toast.success("Item deleted successfully.")
        dispatch(removeItemFromCart(cart_id))
    }

    const increase_in_cart = item => (e) => {
        e.preventDefault()
        let new_quantity = item.quantity + 1
        if (new_quantity > item.count_in_stock) {
            Swal.fire('Warning!', 'Maximum stock reached', 'warning')
        }
        else {
            dispatch(updateCart(item, new_quantity))
        }
    }

    const decrease_in_cart = item => (e) => {
        e.preventDefault()
        let new_quantity = item.quantity - 1
        if (new_quantity == 0) {
            Swal.fire("Warning", "Quantity cannot be decreased. Remove inseted?", 'question')
                .then(result => {
                    if (result.isConfirmed) {
                        dispatch(removeItemFromCart(item.product))
                    }
                })

        }
        else {
            dispatch(updateCart(item, new_quantity))
        }
    }

    const handleCheckout = e => {
        e.preventDefault()
        sessionStorage.setItem('total', total)
        navigate('/checkout')
        
    }





    return (
        <>
            <ToastContainer position='top-center' theme='colored' />


            {
                cart_items.length <= 0 ? (
                    <div className='d-flex text-center my-5'>
                        <h1 className='text-center text-secondary align-items-center'>Your Cart is Empty</h1>
                        <img src="https://img.freepik.com/free-vector/girl-pushing-shopping-trolley_1308-77594.jpg?t=st=1737369594~exp=1737373194~hmac=263d141e4c45bfd0cc5b7ef5e2da014560cc3d2ce043c4c82b59faeac0c28206&w=740" alt="" width={'300px'} />
                    </div>

                ) : (



                    <div className="d-flex justify-content-evenly my-5">
                        <div className="col-md-8 shadow">
                            <table className="table table-bordered table-striped table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        cart_items.map((item, i) => (
                                            <Fragment key={i}>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td className='text-center'>
                                                        <img src={`${API}/${item.product_image}`} style={{ height: '100px' }} alt="" />
                                                    </td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.product_price}</td>
                                                    <td>
                                                        <button className='btn btn-danger me-2 px-3' onClick={decrease_in_cart(item)}>-</button>
                                                        {item.quantity}
                                                        <button className='btn btn-success ms-2' onClick={increase_in_cart(item)}>+</button>

                                                    </td>
                                                    {/* <td>{item.category}</td> */}
                                                    {/* <td className='text-center'>
                                        {item.image && item.image.length > 1 ? (
                                            <img src={item.image[0]} alt="item" width="200px"  />
                                        ) : (
                                            <img src={item.image} alt="item" width="200px" />
                                        )
                                    }</td> */}

                                                    <td><button className='btn btn-danger' onClick={() => deleteItem(item.product)}><i className='bi bi-trash'></i></button></td>
                                                </tr>
                                            </Fragment>
                                        ))
                                    }

                                </tbody>

                            </table>
                        </div>
                        <div className="col-md-2">
                            <section className="shadow col-md-12 p-3 border">
                                <h2>Cart Summary</h2>
                                <hr />
                                <p className="fw-semibold text-secondary">Total Quantity : <span className="text-success">
                                    {
                                        cart_items.reduce((acc, item) => (
                                            acc + item.quantity
                                        ), 0)
                                    } units
                                </span></p>
                                <p>Price : <span className="text-success">Rs.
                                    {total}
                                </span></p>
                                {/* <p>VAT : <span className="text-success">Rs.
                                    {
                                        cart_items.reduceRight((acc, item) => (
                                            acc + 13 / 100 * item.price
                                        ), 0).toFixed(2)
                                    }
                                </span></p>
                                <p>Discount : <span className="text-success">Rs.
                                    {
                                        cart_items.reduceRight((acc, item) => (
                                            acc + 10 / 100 * item.price
                                        ), 0).toFixed(2)
                                    }
                                </span></p><hr /> */}
                                <hr />
                                {/* <p>Total : <span className="text-success">Rs.
                                    {
                                        cart_items.reduceRight((acc, item) => (
                                            (acc + item.price * item.quantity) - (acc + 10 / 100 * item.price) + (acc + 13 / 100 * item.price)
                                        ), 0).toFixed(2)
                                    }
                                </span></p> */}
                                <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>
                            </section>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Cartpage
