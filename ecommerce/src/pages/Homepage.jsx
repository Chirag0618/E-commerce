import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import Card from '../components/Card'
import axios from 'axios'

const Homepage = () => {

  const [products, setProducts] = useState([])
  axios.get('https://dummyjson.com/products')
    .then(res => setProducts(res.data.products))
    .catch(err => console.log(err))

    

  return (
    <div>
      <Slider />
      
      <div class="d-md-flex justify-content-evenly flex-wrap" id='products'>
        {
          products.slice(0, 4).map((item) => (
            <div className="col">
              <Card key={item._id} itemData={item} />
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Homepage
