import React from 'react'
import { useDispatch } from 'react-redux'

const StateChanger = () => {
    const dispatch = useDispatch()

    const add=()=>{
        dispatch({type:'ADD'})
        alert('State Changed')
    }
    const remove=()=>{
        dispatch({type: 'REMOVE'})
        // alert('State Changed') 
    }
    
  return (
    <div>
      <button onClick={add} className='btn btn-success'>Add</button>
      <button onClick={remove} className='btn btn-danger ms-2'>Remove</button>
    </div>
  )
}

export default StateChanger
