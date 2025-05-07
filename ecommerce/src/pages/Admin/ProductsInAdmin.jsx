import React, { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts } from '../../api/productapi'
import { API } from '../../config'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../api/userAPI'

const ProductsInAdmin = () => {
    let [products, setProducts] = useState([])
    let [success, setSuccess] = useState(false)
    const {token} = isAuthenticated()


    useEffect(() => {
        getAllProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProducts(data)
                    setSuccess(false)
                }
            })
    }, [success])

    const handleDelete = id => e => {
        e.preventDefault()
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this product',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'No!',
            cancelButtonColor: '#ffaabb'
        })
            .then(result => {
                if (result.isConfirmed) {
                    // delete product
                    deleteProduct(id, token)
                        .then(data => {
                            if (data.error) {
                                Swal.fire('Oops!', data.error, 'error')
                            }
                            else {
                                Swal.fire('Congrats!', data.message, 'success')
                                setSuccess(true)
                            }
                        })
                }
            })
    }



    return (
        <div className='p-5'>
            <h2>Products</h2>
            <table className='table table-bordered text-center'>
                <thead className='table-dark'>
                    <tr>
                        <td>S.No.</td>
                        <td>Image</td>
                        <td>Product Title</td>
                        <td>Product Price</td>
                        <td>Count in Stock</td>
                        <td>Category</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 &&
                        products.map((product, i) => {
                            return <tr key={product.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <img src={`${API}/${product.product_image}`} alt={product.product_name} style={{ height: '100px' }} />
                                </td>
                                <td>{product.product_title}</td>
                                <td>{product.product_price}</td>
                                <td>{product.count_in_stock}</td>
                                <td>{product.category?.category_name}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`/admin/product/${product._id}`} className='btn btn-warning'>Update</Link>
                                        <button className='btn btn-danger' onClick={handleDelete(product._id)}>Remove</button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>
                            <Link className='btn btn-primary' to={'/admin/product/new'}>Add New Product</Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ProductsInAdmin
