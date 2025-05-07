import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import React from 'react'

const Rating = (props) => {

    const rating = props.rating
    let stars = []
    for(let i=1;i<=5;i++){
        if(i<=rating){
            stars.push(<FaStar key={i}/>) 
        }
        else if(Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<FaStarHalfAlt key={i}/>)
        }
        else{
            stars.push(<FaRegStar key={i}/>) 
        }
        
    }
  return (
    <>
    <p className="fw-bold">Rating: <span className="text-warning">{stars}</span> </p>
      
    </>
  )
}

export default Rating
