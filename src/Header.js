import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './Header.css'
import { ShoppingBasket } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './Firebase';

function Header() {
    const [{basket,user},dispatch] = useStateValue()
    const handleAuthentication=()=>{
        if(user){
            auth.signOut();
        }
    }
    return (
        <div className="header">
            <Link to="/">
            <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
            </Link>
            <div className="header__search">
                <input type="text" className="header__input"/>
                <SearchIcon className="search__icon"/>
            </div>
            <div className="header__options">
               <Link to={!user && '/login'}>
               <div className="header__nav" onClick={handleAuthentication}>
                <span className="header__navline1">Hello {user ? user.email : 'Guest'}</span>
                <span className="header__navline2">{user?'Sign out':'Sign in'}</span>
                </div>
               </Link>
              <Link to='/orders'>
              <div className="header__nav">
                <span className="header__navline1">Orders</span>
                <span className="header__navline2">& returns</span>
            
                   
                </div>
                </Link>
                <div className="header__nav">
                <span className="header__navline1">Your</span>
                <span className="header__navline2">Prime</span>
                    
                </div>
                <Link to="/checkout">
                <div className="shopping_basket">
                    <ShoppingBasket/>
                    <span className="header__navline2 shopping_cart">{basket.length}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
