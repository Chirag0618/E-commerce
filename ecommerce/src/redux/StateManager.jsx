import React from 'react'
import { useSelector } from 'react-redux'
import StateChanger from './StateChanger'

const StateManager = () => {
    const state = useSelector((store) => store.cartData)
    const studentInfo = useSelector(store => store.studentData)
  return (
    <div>

        <h1 className='text-success mt-5'>The Initial Cart Value is {state.cart}</h1>
      <StateChanger/>

      <h2>The Student name is {studentInfo.name}</h2>

    </div>
  )
}

export default StateManager
