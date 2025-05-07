import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../api/categoryAPI'

const CategoryCheckbox = ({handleFilter}) => {


    let [categories, setCategories] = useState([])
    let[selected, setSelected] = useState([])

    const handleChecked = e =>{
        let newSelected  = selected
        let newCategory = e.target.value

        let exists = newSelected.findIndex(category => category === newCategory)
        if(exists === -1){
            newSelected.push(newCategory)
        }
        else{
            newSelected.splice(exists, 1)
        }
        setSelected(newSelected)
        handleFilter('category', newSelected)
    }

    useEffect(()=>{
        getAllCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
            }
        })
    },[])
  return (
    
    <div className="p-5 fs-5">
      <h3 className='text-2xl font-bold text-decoration-underline '>Departments</h3>


        {
            categories.length > 0 &&
            categories.map(category=>{
                return <div className='my-1'>
                    <input type="checkbox" id={category._id} className='me-2' onChange={handleChecked} value={category._id}/>
                    <label htmlFor={category._id}>{category.category_name}</label>
                </div>
            })
        }
    </div>
   
  )
}

export default CategoryCheckbox
