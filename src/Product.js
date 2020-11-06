import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({title,id,price,image,rating}) {
    const [state,dispatch] = useStateValue()
    const addToBasket= ()=>{
     dispatch({
         type:"ADD_TO_BASKET",
         item:{
             title:title,
             price:price,
             image:image,
             rating:rating
         }
     })
    }
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_,i)=>(
                    <p>🌟</p>     
                    ))}
                   
                </div>

            </div>
            <img src={image}
            alt="book image" className="product__image"/>
            <button onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product
