import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategories } from '../../api/categoryAPI'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../api/userAPI'

const Category = () => {
    let [categories, setCategories] = useState([])
    let [success, setSuccess] = useState(false)
    const { token } = isAuthenticated()

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                    setSuccess(false)
                }
            })
    }, [success])

    const handleDelete = id => e => {
        e.preventDefault()
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this category',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'No!',
            cancelButtonColor: '#ffaabb'
        })
            .then(result => {
                if (result.isConfirmed) {
                    // delete category
                    deleteCategory(id, token)
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
            <h1 className='text-center'>Categories</h1>
            <table className='table table-bodered text-center'>
                <thead className='table-dark'>
                    <tr>
                        <th>S.No.</th>
                        <th>Category Name</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        categories.length > 0 &&
                        categories.map((category, i) => {
                            return <tr>
                                <td>{i + 1}</td>
                                <td>{category.category_name}</td>
                                <td>
                                    <div className='btn-group'>
                                        <Link to={`/admin/category/${category._id}`} className='btn btn-warning me-2 rounded '>
                                            <i className='bi bi-pencil-square'></i>
                                            EDIT</Link>
                                        <button className='btn btn-danger rounded'
                                            onClick={handleDelete(category._id)}>
                                            REMOVE<i className='bi bi-trash'></i></button>
                                    </div>
                                </td>

                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            <Link to={'/admin/category/new'} className='btn btn-success'>ADD CATEGORY</Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Category
