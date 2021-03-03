import React,{useState} from "react";
import { Link, withRouter } from "react-router-dom";

import Footer from "../components/Footer";
 

const Register =(props)=> {
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
        props.onRegister({email,password})
  
      }

   
 
    return (
      
      <div className="register">
        
        <form onSubmit={handleSubmit} className="register__form">
          <h2 className="register__form-title">Регистрация</h2>
          <input
            className="register__input"
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
          ></input>

          <input
            className="register__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          ></input>

          <button
            type="submit"
           
            className="register__link"
          >
            Зарегистрироваться
          </button>
          <div className="register__signin">
          <p className="register__login-question">Уже зарегистрированы?</p>
          <div to="signin" className="register__login-link"> 
          
            <Link to="/signin" type="button" className="register__login">Войти</Link>
          </div>
        </div>
        </form>

      
        
      </div>
      
      
    );
  

    }

export default Register;








// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//     // this.handleChange = this.handleChange.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleChangeCals = this.handleChangeCals.bind(this);
//   }
//   //   handleChange = (e) => {
//   //     const {name, value} = e.target;
//   //     this.setState({
//   //       [name]: value
//   //     });
//   //   }
//   //   handleChangeCals = (e) => {
//   //     const {name, value} = e.target;
//   //     this.setState({
//   //       [name]: value
//   //     });
//   //   }
//   //   handleSubmit = (e) => {
//   //     e.preventDefault();
//   //     if (this.state.password === this.state.confirmPassword){
//   //       auth.register(this.state.username, this.state.password, this.state.email, this.state.calGoal).then((res) => {
//   //         if(res){
//   //           this.props.history.push('/login');
//   //         } else {
//   //           console.log('Произошла ошибка.');
//   //         }
//   //       });
//   //     }
//   //   }
//   render() {
//     return (
//       <div className="register">
//         <form onSubmit={this.handleSubmit} className="register__form">
//           <h2 className="register__form-title">Регистрация</h2>
//           <input
//             className="register__input"
//             id="email"
//             name="email"
//             type="email"
//             value={this.state.email}
//             onChange={this.handleChange}
//           ></input>

//           <input
//             className="register__input"
//             id="password"
//             name="password"
//             type="password"
//             value={this.state.password}
//             onChange={this.handleChange}
//           ></input>

//           <button
//             type="submit"
//             onSubmit={this.handleSubmit}
//             className="register__link"
//           >
//             Зарегистрироваться
//           </button>
//         </form>

//         <div className="register__signin">
//           <p className="register__login-question">Уже зарегистрированы?</p>
//           <div to="login" className="register__login-link"> 
//           {/* //{заменить на link}/ */}
//             Войти
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Register;
