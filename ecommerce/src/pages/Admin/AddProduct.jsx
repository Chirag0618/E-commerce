import React, { useEffect, useRef, useState } from 'react'
import { getAllCategories } from '../../api/categoryAPI'
import { isAuthenticated } from '../../api/userAPI'
import { addProduct } from '../../api/productapi'
import Swal from 'sweetalert2'

const AddProduct = () => {

    let [categories, setCategories] = useState([])
    let [product, setProduct] = useState({})
    const {token} = isAuthenticated()

    let {product_title, product_price, count_in_stock, product_description} = product
    let file_ref = useRef()
    let select_ref = useRef()

   

    const handleChange = (e, value) => {
        if(e.target.name === 'product_image'){
            value = e.target.files[0]
        }
        else{
            value = e.target.value
        }
        setProduct({...product, [e.target.name]: value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        let formdata = new FormData()
        for(var key in product){
            console.log(key, product[key])
            formdata.set(key, product[key])
        }
        
        addProduct(formdata, token)
        .then(data=>{
            if(data.error){
                Swal.fire('Oops!', data.error, 'error')
                
            }
            else{
                setProduct({product_title:"", product_price:"", count_in_stock:"", product_description:"" })
                file_ref.current.value = ''
                select_ref.current.value = ''

                Swal.fire('Congrats!', 'Product Added Successfully', 'success')
            }
        })
    }

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
    }, [])
    return (
        <>
            <div className="p-5">
                <h2 className='text-center text-decoration-underline'>Add Product</h2>
                <form className='p-5 rounded shadow-lg'>

                    <label htmlFor="product_name">Product Name</label>
                    <input type="text" id="product_name" className='form-control' name='product_title'  onChange={handleChange} value={product_title}/>

                    <label htmlFor="product_price">Product Price</label>
                    <input type="number" id="product_price" className='form-control' name='product_price'  onChange={handleChange} value={product_price}/>

                    <label htmlFor="product_description">Description</label>
                    <textarea type="text" id="product_description" className='form-control' name='product_description'  onChange={handleChange} value={product_description}/>

                    <label htmlFor="count_in_stock">Count In Stock</label>
                    <input type="number" id="count_in_stock" className='form-control' name='count_in_stock'  onChange={handleChange} value={count_in_stock}/>

                    <label htmlFor="category">Category</label>
                    <select id="category" className='form-control' name='category'  onChange={handleChange} defaultValue={''} ref={select_ref}>
                        <option value="" disabled>Choose a Category</option>
                        {
                            categories.length > 0 &&
                            categories.map((category) => {
                                return <option key={category._id} value={category._id}>{category.category_name}</option>
                            })
                        }

                    </select>

                    <label htmlFor="product_image">Product Image</label>
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02" name='product_image' onChange={handleChange} ref={file_ref}/>
                    </div>

                    <button className='btn btn-success' onClick={handleSubmit}>Add New Product</button>


                </form>
            </div>

        </>
    )
}

export default AddProduct
