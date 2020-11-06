import Header from './Header'
import Home from './Home'
import './App.css';
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from  './Orders'

const promise = loadStripe('pk_test_51HiyGKJhwiMot9x3PWr3yJUEBnzvgLTdosTEYKMyjjG9SzJMr9Jg5uTEUAlttnHcWfbsFO7PbdV4BaJi8UpKbKnh00AYUYAVEd')

function App() {
  const [{},dispatch]= useStateValue()
  useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
   console.log('the user is',authUser)
   if(authUser){
     dispatch({
       type:"SET_USER",
       user:authUser
     })
   }else{
     dispatch({
       type:"SET_USER",
       user:null
     })
   }
  })
  },[])
  return (
    <div className="App">

      <Router>
      

     <Switch>
       <Route path='/orders'>
       <Header/>
         <Orders/>
       </Route>
       <Route path='/payment'>
       <Header/>
       <Elements stripe={promise}>
       <Payment/>
       </Elements>
       </Route>
       <Route path="/login">
         <Login/>
       </Route>
       <Route path="/checkout">
       <Header/>
         <Checkout/>  
       </Route>

       <Route path="/">
       <Header/>
       <Home/>
       </Route>
       
     </Switch>
      </Router>
    
    </div>
  );
}

export default App;
