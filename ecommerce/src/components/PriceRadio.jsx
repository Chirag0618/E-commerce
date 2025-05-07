import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../api/categoryAPI'

const PriceRadio = ({handleFilter}) => {


    const prices = [
        {
            id: "0",
            name: "All",
            value:[]
        },
        {
            id: "1",
            name: "Upto Rs.1000",
            value:[0, 999]
        },
        {
            id: "2",
            name: "Rs.1000 - Rs.10000",
            value:[1000, 9999]
        },
        {
            id: "3",
            name: "Rs.10000-Rs.50000",
            value:[10000, 49999]
        },
        {
            id: "4",
            name: "Above Rs.50000",
            value:[50000, 999999999]
        },
    ]

    const handleChange = e =>{
        let newValue = e.target.value
        let newPrice = prices.find(price => price.id === newValue)
        handleFilter('product_price',newPrice.value)
    }
    
  return (
    
    <div className="p-5 fs-5">
      <h3 className='text-2xl font-bold text-decoration-underline'>Prices</h3>


        {
            prices.length > 0 &&
            prices.map(price=>{
                return <div className='my-1'>
                    <input type="radio" id={price.id} className='me-2' name='price' value={price.id} onChange={handleChange}/>
                    <label htmlFor={price.id}>{price.name}</label>
                </div>
            })
        }
    </div>
   
  )
}

export default PriceRadio
