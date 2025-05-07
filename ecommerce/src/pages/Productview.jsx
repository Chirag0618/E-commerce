import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Rating from '../components/Rating'
import Swal from 'sweetalert2'
import { getProductDetails, getRelatedProducts } from '../api/productapi'
import { API } from '../config'
import Card from '../components/Card'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/finalreducer/cartActions'


const Productview = () => {
    let params = useParams()
    let id = params.product_id

    const [product, setProduct] = useState({})

    let [relatedProducts, setRelatedProducts] = useState([])
    
    const dispatch = useDispatch()

    useEffect(() => {
        getProductDetails(id)
            .then(data => setProduct(data))
            .catch(err => console.log('Something Went Wrong'))

        getRelatedProducts(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setRelatedProducts(data)
                }
            })
    }, [params])

    const [qty, setQty] = useState(1)

    const handleAddtocart = e =>{
        dispatch(addToCart(product, qty))
    }



    // const addtocart = () => {

    //     // fetching local storage data if exists
    //     let cart = JSON.parse(localStorage.getItem('cart')) || []

    //     // setting object variables for product data
    //     let product_cart_data = {
    //         id: product.id,
    //         name: product.title,
    //         price: product.price,
    //         quantity: qty,
    //         image: product.images,
    //         category: product.category
    //     }

    //     // set data to the local storage if not exist 
    //     let existingItem = cart.find((item) => item.id === product.id)
    //     if (existingItem) {
    //         // toast.error("Item already exists")
    //         Swal.fire({
    //             icon: "error",
    //             title: "Item Already Exists",
    //         });
    //     }
    //     else {
    //         cart.push(product_cart_data)
    //         localStorage.setItem('cart', JSON.stringify(cart))
    //         // toast.success("Item Added to Cart")
    //         Swal.fire({
    //             icon: "success",
    //             title: "Item Added to Cart",
    //         });
    //     }


    // }

    const decrease = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Enter Atleast One Quantity",
            });
        }
    }


    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div class="container my-5 shadow rounded-3 bg-success-subtle p-5">
                <div class="d-md-flex justify-content-evenly">
                    <div class="col-md-4">
                        <img src={`${API}/${product.product_image}`} alt="product" width="100%" height="100%" />




                    </div>

                    <div class="col-md-6">
                        <p>
                            <Link to={"/"}>Home</Link> /
                            <Link to={"/products"}>Products</Link> /
                            <small class="text-secondary">{product.product_title}</small>
                        </p>

                        <h2>{product.product_title}</h2>
                        <small class="text-secondary">{product.category?.category_name}</small>

                        <p class="fw-bold mt-3">Price: <span class="text-success">Rs. {product.product_price}</span></p>
                        <p class="fw-bold mt-3">In Stock: <span class="text-success">{product.count_in_stock}</span></p>


                        <p class="fw-bold">Quantity</p>
                        <div class="d-flex col-4 mb-3">
                            {/* <button class="btn btn-secondary me-2" onClick={decrease}> - </button> */}
                            <input type="number" class="form-control w-50 text-center" max={product.count_in_stock} min={1} defaultValue={1} onChange={e=>setQty(e.target.value)}/>
                        </div>
                        <p class="fw-bold">Description</p>
                        <p>{product.product_description}</p>

                        {
                            product.rating && <Rating rating={product.rating} />
                        }

                        <div class="d-flex mt-5">
                            <button class="btn btn-danger me-5">Buy Now</button>
                            <button class="btn btn-warning" onClick={handleAddtocart}> Add to Cart</button>
                        </div>

                    </div>
                </div>
                <hr />
                <div className='p-3'>

                    <h3>Related Products</h3>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {
                            relatedProducts.map((item) => (
                                <div className="col">
                                    <Card key={item._id} itemData={item} />
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>


        </>
    )
}

export default Productview
