import React, { useEffect, useState } from 'react'

const Counterjs = () => {

    const [num, setNum] = useState(0)
    // where num is a variable that stores the value and setNum is a function that updates the value of num

    const decrease=()=>{
        if(num>0){
        setNum(num-1);
        }
    }

    useEffect(()=>{
        alert('State Changed')
    }, [])

  return (
    <div className='m-auto col-4'>

    <h1 className='text-center'>The Initial State is {num}</h1>

    {
        num < 10 && <button className='btn btn-success me-2'onClick={() => setNum(num+1)}>Increase</button>

    }

    <button className='btn btn-primary me-2' onClick={()=>setNum(0)}>Reset</button>

    {
        num > 0 && <button className='btn btn-danger' onClick={decrease}>Decrease</button>

    }


      
    </div>
  )
}

export default Counterjs
