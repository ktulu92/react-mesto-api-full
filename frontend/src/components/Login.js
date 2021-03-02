import React,{useState} from "react";
import { Link, useHistory, withRouter } from "react-router-dom";


const Login = (props)=> {
const [email,setEmail]=useState('');
const[password,setPassword]=useState('')


 
    
    const handleEmailChange = (e) => {
   setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {     
      setPassword(e.target.value)
    }
   
    const handleSubmit = (e) => {
      e.preventDefault();
 
    }

    return (
      <div className="login">
        <form onSubmit={handleSubmit} className="login__form">
          <h2 className="login__form-title">Вход</h2>
          <input
          placeholder="Email"
            className="login__input"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          ></input>

          <input
            className="login__input"
            placeholder="Пароль"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>

          <button
            type="submit"
             className="login__link"
          >
            Войти
          </button>
        </form>

     
      </div>
    );
    
}

export default Login;
