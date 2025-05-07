import React, { useEffect, useState } from 'react'
import { editCategory, getCategoryDetails } from '../../api/categoryAPI'
import { isAuthenticated } from '../../api/userAPI'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditCategory = () => {
    let [category, setCategory] = useState('')

    const { token } = isAuthenticated()
    const {id} = useParams()

    useEffect(()=>{
        getCategoryDetails(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategory(data.category_name)
            }
        })
    },[])


    const handleSubmit = (e) => {
        e.preventDefault()
        editCategory(id, { category_name: category }, token)
            .then(data => {
                if (data.error) {
                    Swal.fire('Oops!',data.error,'error')
                }
                else {
                    Swal.fire('Congrats!!','Category Updated Successfully','success')
                }
            })
    }
    return (
        <div className='p-5'>
            <h1 className='text-decoration-underline'>Update Category</h1>
            <form className='w-75 mx-auto p-5 border my-5 rounded shadow-lg'>
                <label htmlFor="category_name" className='h4'>Category Name</label>
                <input type="text" id="category_name" className='form-control' onChange={e => setCategory(e.target.value)} value={category}/>

                <div className="d-flex mt-2">
                    <button className='btn btn-warning form-control mt-2 me-5' onClick={handleSubmit}>Update Category</button>
                    <Link to={'/admin/category'} className='w-50 btn btn-info mt-2 form-control'>Back</Link>

                </div>
            </form>
        </div>
    )
}

export default EditCategory
