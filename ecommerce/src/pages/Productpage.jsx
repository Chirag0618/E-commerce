import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { getAllProducts } from '../api/productapi'
import CategoryCheckbox from '../components/CategoryCheckbox'
import PriceRadio from '../components/PriceRadio'

const Productpage = () => {
  const [products, setProducts] = useState([])
  // axios.get('https://dummyjson.com/products')

let[filter, setFilter] = useState({category:[], product_price:[]})

const handleFilter = (filterBy, filters) =>{
  setFilter({...filter, [filterBy]: filters})
  console.log(filter)
}


  useEffect(() => {
    getAllProducts(filter)
      .then(res => setProducts(res))
      .catch(err => console.log(err))

  }, [filter])

  return (
    <>

      <div className="container-fluid">
        <div className="row">
          <div className="col-11 col-md-4 col-lg-3">
            <CategoryCheckbox handleFilter = {handleFilter}/>
            <PriceRadio handleFilter = {handleFilter}/>
          </div>
          <div className="col-11 col-md-8 bg-success col-lg-9">

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {
                products.map((item) => (
                  <div className="col">
                    <Card key={item._id} itemData={item} />
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </div>




    </>
  )
}

export default Productpage
