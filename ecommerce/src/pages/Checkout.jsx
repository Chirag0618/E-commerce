import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingInfo } from '../redux/finalreducer/cartActions'

const Checkout = () => {
  let shipping_info = useSelector(store=>store.cartStore.shipping_info)
  let {street_address, alternate_street_address, postal_code, country, phone, city, state } = shipping_info

  let [newShippingInfo, setShippingInfo] = useState(shipping_info)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = e =>{
    setShippingInfo({...newShippingInfo, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(saveShippingInfo(newShippingInfo))
    navigate('/payment')
  }

  return (
    <div className="p-5">
      <h2 className='text-center text-decoration-underline'>Checkout</h2>
      <form className='p-5 rounded shadow-lg'>
        <label htmlFor="street_address">Street Address</label>
        <input type="text" className='form-control' value={street_address} name='street_address' onChange={handleChange}/><br />

        <label htmlFor="alternate_street_address">Alternate Street Address</label>
        <input type="text" className='form-control' value={alternate_street_address} name='alternate_street_address' onChange={handleChange}/><br />
        <label htmlFor="city">City</label>
        <input type="text" className='form-control' value={city} name='city' onChange={handleChange}/><br />
        <label htmlFor="state">State</label>
        <input type="text" className='form-control' value={state} name='state' onChange={handleChange}/><br />
        <label htmlFor="postal_code">Postal Code</label>
        <input type="text" className='form-control' value={postal_code} name='postal_code' onChange={handleChange}/><br />
        <label htmlFor="country">Country</label>
        <input type="text" className='form-control' value={country} name='country' onChange={handleChange}/><br />
        <label htmlFor="phone">Phone</label>
        <input type="text" className='form-control' value={phone} name='phone' onChange={handleChange}/><br />

        <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Save Shipping Info & Procced to Payment</button>
      </form>

    </div>
  )
}

export default Checkout
