import React from 'react'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import './Order.css'
function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
             <small>{order?.id}</small>
            </p>
            {order.data.basket?.map(item=>(
                 <CheckoutProduct 
                 id={item.id}
                 image={item.image}
                 price={item.price}
                 rating= {item.rating}
                 title={item.title}
                 hideButton
                 />  
            ))}
                       <CurrencyFormat 
                         renderText={(value)=>(
                         <h3 className="order_total">Order Total : {value}</h3>
                          )}
                        decimalScale={2}
                        value={order.data.amount / 100}
                        displayType={"text"}
                        thousandSeprator={true}
                         prefix={"$"}
                         />   
        </div>
    )
}

export default Order
