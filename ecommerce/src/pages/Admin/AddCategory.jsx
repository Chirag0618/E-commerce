import React, { useState } from 'react'
import { addCategory } from '../../api/categoryAPI'
import { isAuthenticated } from '../../api/userAPI'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddCategory = () => {
    let [category, setCategory] = useState('')

    const { token } = isAuthenticated()

    const handleSubmit = (e) => {
        e.preventDefault()
        addCategory({ category_name: category }, token)
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        title:'Oops!',
                        text: data.error,
                        icon: 'error',
                    })
                }
                else {
                    Swal.fire('Congrats!','Category Added Successfully','success')
                }
            })
    }
    return (
        <div className='p-5'>
            <h1 className='text-decoration-underline'>Add Category</h1>
            <form className='w-75 mx-auto p-5 border my-5 rounded shadow-lg'>
                <label htmlFor="category_name" className='h4'>Category Name</label>
                <input type="text" id="category_name" className='form-control' onChange={e => setCategory(e.target.value)} />

                <div className="d-flex mt-2">
                    <button className='btn btn-warning form-control mt-2 me-5' onClick={handleSubmit}>Add Category</button>
                    <Link to={'/admin/category'} className='w-50 btn btn-info mt-2 form-control'>Back</Link>

                </div>
            </form>
        </div>
    )
}

export default AddCategory
