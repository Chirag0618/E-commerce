import React from 'react'
import { Link } from 'react-router-dom'
import { API } from '../config'

const Card = (props) => {
  return (
    <div>
      <div className="container py-0" id="arrivals" >
        <div className="card mt-5 border shadow rounded m-3 pt-4 pb-4" >
          <div className='image' >
            <img src={`${API}/${props.itemData.product_image}`} className="card-img-top" alt="p1" width='200px' />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title text-center" title={props.itemData.product_title}>{props.itemData.product_title}</h5>
            <p className="fw-bold">Price : <span class="text-success">Rs. {props.itemData.product_price}</span> </p>
            <Link to={`/productview/${props.itemData._id}`} className="text-white text-decoration-none btn btn-warning btn-sm"><i className="bi bi-eye-fill me-2"></i>View More </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Card
