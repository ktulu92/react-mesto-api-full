import React from "react"; 
import { Route, Redirect, Link } from "react-router-dom"; 
 
function Header(props) { 
  const { isLoggedIn, email, onOut } = props; 
  return ( 
    <header className="header"> 
      <div className="header__logo"></div> 

      <Route className="header__enter" path="/signin"> 
        <Link to="/signup" className="header__out"> 
          Регистрация 
        </Link> 
      </Route> 
 
      <Route className="header__reg" path="/signup"> 
        <Link to="/signin" className="header__out"> 
          Войти 
        </Link> 
      </Route> 
 

      <Route path="/"> 
         
        {isLoggedIn && ( 
          <div className="header__user-info"> 
            <p className="header__email">{email}</p> 
            <button className="header__out" onClick={onOut}> 
              Выйти 
            </button> 
          </div> 
        )} 
      </Route> 
    </header> 
  ); 
} 
 
export default Header; 