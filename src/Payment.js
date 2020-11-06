import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import './Payment.css'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from  'react-currency-format'
import {getBasketTotal} from './reducer'
import axios from './axios'
import { db } from './Firebase'

function Payment() {
    const history = useHistory()
    const [{basket,user},dispatch]=useStateValue()
    const stripe = useStripe()
    const elements = useElements()

    const[disable,setDisable] = useState(true)
    const [error,setError] = useState(null)
    const [processing,setProcessing ] = useState("")
    const [succedded,setSuccedded] = useState(false)
    const [clientSecret,setClientSecret] =useState(true)
    //By client secretKey the stripe will get to know how much we are charging a customer
  
    useEffect(()=>{
    //generate the special stripe secret which allows us to charge a customer
    const getClientKey = async () => {
    const response = await axios({
        method: 'post',
        //stripe expects the total in a currencies subunit
        url: `/payments/create?total=${Math.round(getBasketTotal(basket)*100)}`
    });
    setClientSecret(response.data.clientSecret)
    }
    getClientKey();
    },[basket])//here bucket is dependency because we want the secret key to generate whenever thh basket changes i.e price changes
   
     console.log("the client secret is >>",clientSecret)

    const handleSubmit= async (event)=>{
        event.preventDefault()
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret ,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent = payment connfirmation
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
           
            
            setSuccedded(true);
            setError(null)
            setProcessing(false)
            dispatch({
                type:"EMPTY_BASKET"
            })
            history.replace('/orders')  //history.replace will prevent the user from getting back to previous page it will swap the page
        })

    }
    const handleChange=event=>{
        setDisable(event.empty);
        setError(event.error ? event.error.message : "");

    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
                <div className="payment__section">
                  <div className="payment_title">
                      <h3>Delivery Address</h3>
                  </div>
                  <div className="address__section">
                       <p>{user?.email}</p>
                       <p>123 React lane</p>
                       <p>India</p>
                  </div>
                </div>
                <div className="payment__section">
                    <div className="payment_title">
                        <h3>Review Items And Delivery</h3>
                        </div>
                        <div className="payment_items">
                        {basket.map((item)=>(
                         <CheckoutProduct
                         id={item.id}
                         image={item.image}
                         price={item.price}
                         rating= {item.rating}
                         title={item.title}/>   
                        ))}
                        
                
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    {/* Stripe magic will go here */}
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__priceContainer">
                        <CurrencyFormat 
                         renderText={(value)=>(
                         <h3>Order Total : {value}</h3>
                          )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeprator={true}
                         prefix={"$"}
                         />   
                         <button type="submit" disabled={processing || succedded ||disable}>
                             <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                         </button>
                        </div>
                        {error && <div className="error">{error   }</div>}
                        </form>
                    </div>
                 </div>
                
            </div>
            
        </div>
    )
}

export default Payment
