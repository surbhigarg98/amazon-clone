import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './Firebase'
import './Login.css'

function Login() {
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const siginIn =e=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password).then((auth)=>{
            history.push('/')
        }).catch((error)=>{
            alert(error.message)
        })
    }
    const register=e=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
        if(auth){
            history.push('/')
        }
        }).catch((error)=>{
         alert(error.message)     
        })
    }
    return (
        <div className="login">
           <Link to ="/">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="logo" className="login__logo"/>
           </Link>
           <div className="login__container">
               <h1>Sign-in</h1>
               <h5>E-mail</h5>
               <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
               <h5>Password</h5>
               <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
               <button className="login__signInButton" type="submit" onClick={siginIn}>Sign in</button>
               <p>By continuing, you agree to Amazon's clone Conditions of Use and Privacy Notice.</p>
               <button className="login__registerButton" onClick={register} >Create Amazon Account</button>
           </div>
        </div>
    )
}

export default Login
