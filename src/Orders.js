import React, { useEffect, useState } from 'react'
import { db } from './Firebase';
import { useStateValue } from './StateProvider'
import Order from './Order'
import './Orders.css'
function Orders() {
    const [orders,setOrders] = useState([])
    const [{user,basket},dispatch] = useStateValue();

    useEffect(()=>{
        if(user){
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created','desc') //here we are accesing the most recent order id or paymentIntentId
            .onSnapshot(snapshot=>{
                setOrders(snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                })))
            })
        }else{
            setOrders([])
        }
    },[user])
    console.log("your orders",orders)
     return (

        <div className="orders">
            <h1>Your orders</h1>

            
           <div className="orders__order">
               {orders?.map(order=>(
                   <Order order={order}/>
               ))}
           </div>
            
        </div>
    )
}

export default Orders
