import React, { useState, useEffect } from "react"; 
import { 
  BrowserRouter, 
  Link, 
  withRouter, 
  Switch, 
  Route, 
  Redirect, 
  useHistory, 
} from "react-router-dom"; 
 
import ProtectedRoute from "../components/ProtectedRoute"; 
 
import Header from "./Header"; 
import Footer from "./Footer"; 
import Main from "./Main"; 
import ImagePopup from "./ImagePopup"; 
import { CurrentUserContext } from "../contexts/CurrentUserContext"; 
import api from "../utils/api"; 
import EditProfilePopup from "../components/EditProfilePopup"; 
import EditAvatarPopup from "../components/EditAvatarPopup"; 
import AddPlacePopup from "../components/AddPlacePopup"; 
import Register from "../components/Register"; 
import Login from "../components/Login"; 
import InfoToolTip from "../components/InfoTooltip"; 
import * as auth from "../components/auth"; 
 
function App() { 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); 
  const [setIsEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false); 
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null); 
  const [currentUser, setCurrentUser] = useState({}); 
  const [cards, setCards] = React.useState([]); 
  // const [title, setTitle] = React.useState(""); 
  // const [image, setImage] = React.useState(""); 
  const history = useHistory(); 
  const [IsRegistered, setIsRegisterd] = useState(false); 
  const [loggedIn, setLoggedIn] = useState(false); 
  const [currentUserEmail, setCurrentUserEmail] = useState(""); 
 
  useEffect(() => { 
    checkToken(); 
  }, []); 
 
  React.useEffect(() => { 
    api 
      .getProfileInfo() 
      .then((data) => { 
        setCurrentUser(data); 
      }) 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
      }); 
  }, []); 
 
  function handleLogin(data) { 
    auth 
      .authorize(data.email, data.password) 
      .then((res) => { 
        localStorage.setItem("jwt", res.token); 
        setLoggedIn(true); 
        setCurrentUserEmail(data.email); 
        history.push("/"); 
      }) 
 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
      }); 
  } 
 
  function checkToken() { 
    const token = localStorage.getItem("jwt"); 
    if (token) { 
      auth 
        .getToken(token) 
 
        .then((res) => { 
          const { email } = res.data; 
 
          setCurrentUserEmail(email); 
 
          setLoggedIn(true); 
          history.push("/"); 
        }) 
        .catch((err) => { 
          if (err === 401) return console.log('Неправильный токен');
          if (err === 400) return console.log('Нет токена');
          
          console.log(err);
          return true;
        }); 
    } 
  } 
 
  function handleRegister(data) { 
    auth 
      .register(data.email, data.password) 
      .then((res) => { 
        
        // localStorage.setItem("jwt", res.token); 
        if(res){
          setIsRegisterd(true); 
          setIsInfoToolTipPopupOpen(true); 
          history.push("/signin"); 

        }
        
      }) 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
        setIsRegisterd(false); 
        setIsInfoToolTipPopupOpen(true); 
      }); 
  } 
 
  function handleUpdateUser(info) { 
    api 
      .editProfile(info) 
      .then((data) => { 
        setCurrentUser(data); 
        closeAllPopups(); 
      }) 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
      }); 
  } 
 
  function handleUpdateAvatar(avatar) { 
    api.updateUserAvatar(avatar).then((user) => { 
      setCurrentUser(user); 
 
      closeAllPopups(); 
    }); 
  } 
 
  function handleEditProfileClick() { 
    setIsEditProfilePopupOpen(true); 
  } 
 
  function handleEditAvatarClick() { 
    setAvatarPopupOpen(true); 
  } 
 
  function handleAddPlaceClick() { 
    setIsAddPlacePopupOpen(true); 
  } 
 
  // function handleInfoToolTip(){ 
 
  //   setIsInfoToolTipPopupOpen(true) 
  // } 
 
  function closeAllPopups() { 
    setIsEditProfilePopupOpen(false); 
    setIsAddPlacePopupOpen(false); 
    setAvatarPopupOpen(false); 
    setSelectedCard(null); 
    setIsInfoToolTipPopupOpen(false); 
  } 
 
  function handleCardClick(card) { 
    setSelectedCard(card); 
  } 
 
  function handleCardLike(card) { 
    const isLiked = card.likes.some((i) => i._id === currentUser._id); 
 
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => { 
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку 
 
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c)); 
 
      // Обновляем стейт 
      setCards(newCards); 
    }); 
  } 
 
  function handleCardDelete(card) { 
    api 
      .deleteCard(card._id) 
      .then(() => { 
        const newCards = cards.filter((c) => c._id !== card._id); 
        setCards(newCards); 
      }) 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
      }); 
  } 
 
  function handleAddCardSubmit(card) { 
    api 
      .addNewCard(card) 
      .then((cardData) => { 
        setCards([cardData, ...cards]); 
        closeAllPopups(); 
      }) 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
      }); 
  } 
 
  React.useEffect(() => { 
    api 
      .getInitialCards() 
      .then((cards) => { 
        setCards(cards); 
      }) 
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
      }); 
  }, []); 
 
  function handleLogout() { 
    localStorage.removeItem("jwt"); 
    setLoggedIn(false); 
  } 
 
  //Реаоилзация выхода, удаление токена из локал триджа 
 
  // Вы успешно зарегистрировались! //не забыть 
  // Что-то пошло не так! 
  // Попробуйте ещё раз. 
 
  return ( 
    <CurrentUserContext.Provider value={currentUser}> 
      <div className="page__container"> 
        <Header 
          isLoggedIn={loggedIn} 
          email={currentUserEmail} 
          onOut={handleLogout} 
        /> 
        <Switch> 
          <Route path="/signup"> 
            <Register onRegister={handleRegister} /> 
          </Route> 
          <Route path="/signin"> 
            <Login onLogin={handleLogin} /> 
          </Route> 
 
          <ProtectedRoute 
            path="/" 
            loggedIn={loggedIn} 
            component={Main} 
            email={currentUserEmail} 
            cards={cards} 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete} 
          /> 
        </Switch> 
        <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 
 
        {/* попап редактирования профиля */} 
 
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        /> 
 
        {/* попап редактирования аватара */} 
 
        <EditAvatarPopup 
          isOpen={setIsEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          // onUpdateUser={handleUpdateUser} 
        /> 
 
        {/* попап добавления новой карточки */} 
 
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddCardSubmit} 
        /> 
        <InfoToolTip 
          isRegistered={IsRegistered} 
          isOpen={isInfoToolTipPopupOpen} 
          onClose={closeAllPopups} 
        /> 
 
        <Footer /> 
      </div> 
    </CurrentUserContext.Provider> 
  ); 
} 
 
export default App; 




// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter,
//   Link,
//   withRouter,
//   Switch,
//   Route,
//   Redirect,
//   useHistory,
// } from "react-router-dom";

// import ProtectedRoute from "../components/ProtectedRoute";

// import Header from "./Header";
// import Footer from "./Footer";
// import Main from "./Main";
// import ImagePopup from "./ImagePopup";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import api from "../utils/api";
// import EditProfilePopup from "../components/EditProfilePopup";
// import EditAvatarPopup from "../components/EditAvatarPopup";
// import AddPlacePopup from "../components/AddPlacePopup";
// import Register from "../components/Register";
// import Login from "../components/Login";
// import InfoToolTip from "../components/InfoTooltip";
// import * as auth from "../components/auth";

// function App() {
//   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
//   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
//   const [setIsEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
//   const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = React.useState([]);
//   // const [title, setTitle] = React.useState("");
//   // const [image, setImage] = React.useState("");
//   const history = useHistory();
//   const [IsRegistered, setIsRegisterd] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [currentUserEmail, setCurrentUserEmail] = useState("");

//   React.useEffect(() => {
//     api
//       .getProfileInfo()
//       .then((data) => {
//         setCurrentUser(data);
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   }, []);

//   function handleLogin(data) {
//     auth
//       .authorize(data.email, data.password)
//       .then((res) => {
//         localStorage.setItem("jwt", res.token);
//         setLoggedIn(true);
//         setCurrentUserEmail(data.email);
//         history.push("/");
//       })

//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   }

//   function checkToken() {
//     const token = localStorage.getItem("jwt");
//     if (token) {
//       auth
//         .getToken(token)

//         .then((data) => {
          
//           setLoggedIn(true);
//           setCurrentUserEmail(data.email);
         
//           history.push("/");
//         })
//         .catch((err) => {
//           console.log(`Ошибка: ${err}`);
//         });
//     }
//   }

//   function handleRegister(data) {
//     auth
//       .register(data.email, data.password)
//       .then((res) => {
//         debugger;
//         localStorage.setItem("jwt", res.token);
//         setIsRegisterd(true);
//         setIsInfoToolTipPopupOpen(true);
//         history.push("/");
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//         setIsRegisterd(false);
//         setIsInfoToolTipPopupOpen(true);
//       });
//   }

//   function handleUpdateUser(info) {
//     api
//       .editProfile(info)
//       .then((data) => {
//         setCurrentUser(data);
//         closeAllPopups();
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   }

//   function handleUpdateAvatar(avatar) {
//     api.updateUserAvatar(avatar).then((user) => {
//       setCurrentUser(user);

//       closeAllPopups();
//     });
//   }

//   function handleEditProfileClick() {
//     setIsEditProfilePopupOpen(true);
//   }

//   function handleEditAvatarClick() {
//     setAvatarPopupOpen(true);
//   }

//   function handleAddPlaceClick() {
//     setIsAddPlacePopupOpen(true);
//   }

//   // function handleInfoToolTip(){

//   //   setIsInfoToolTipPopupOpen(true)
//   // }

//   function closeAllPopups() {
//     setIsEditProfilePopupOpen(false);
//     setIsAddPlacePopupOpen(false);
//     setAvatarPopupOpen(false);
//     setSelectedCard(null);
//     setIsInfoToolTipPopupOpen(false);
//   }

//   function handleCardClick(card) {
//     setSelectedCard(card);
//   }

//   function handleCardLike(card) {
//     const isLiked = card.likes.some((i) => i._id === currentUser._id);

//     api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
//       // Формируем новый массив на основе имеющегося, подставляя в него новую карточку

//       const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

//       // Обновляем стейт
//       setCards(newCards);
//     });
//   }

//   function handleCardDelete(card) {
//     api
//       .deleteCard(card._id)
//       .then(() => {
//         const newCards = cards.filter((c) => c._id !== card._id);
//         setCards(newCards);
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   }

//   function handleAddCardSubmit(card) {
//     api
//       .addNewCard(card)
//       .then((cardData) => {
//         setCards([cardData, ...cards]);
//         closeAllPopups();
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   }

//   React.useEffect(() => {
//     api
//       .getInitialCards()
//       .then((cards) => {
//         setCards(cards);
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   }, []);



//   useEffect(() => {
//     checkToken();
//   }, [loggedIn]);


//   function handleLogout() {
//     localStorage.removeItem("jwt");
//     setLoggedIn(false);
//   }

//   //Реаоилзация выхода, удаление токена из локал триджа

//   // Вы успешно зарегистрировались! //не забыть
//   // Что-то пошло не так!
//   // Попробуйте ещё раз.

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page__container">
//         <Header
//           isLoggedIn={loggedIn}
//           email={currentUserEmail}
//           onOut={handleLogout}
//         />
//         <Switch>
//           <Route path="/signup">
//             <Register onRegister={handleRegister} />
//           </Route>
//           <Route path="/signin">
//             <Login onLogin={handleLogin} />
//           </Route>

//           <ProtectedRoute
//             path="/"
//             loggedIn={loggedIn}
//             component={Main}
//             email={currentUserEmail}
//             cards={cards}
//             onEditAvatar={handleEditAvatarClick}
//             onEditProfile={handleEditProfileClick}
//             onAddPlace={handleAddPlaceClick}
//             onCardClick={handleCardClick}
//             onCardLike={handleCardLike}
//             onCardDelete={handleCardDelete}
//           />
//         </Switch>
//         <ImagePopup card={selectedCard} onClose={closeAllPopups} />

//         {/* попап редактирования профиля */}

//         <EditProfilePopup
//           isOpen={isEditProfilePopupOpen}
//           onClose={closeAllPopups}
//           onUpdateUser={handleUpdateUser}
//         />

//         {/* попап редактирования аватара */}

//         <EditAvatarPopup
//           isOpen={setIsEditAvatarPopupOpen}
//           onClose={closeAllPopups}
//           onUpdateAvatar={handleUpdateAvatar}
//           // onUpdateUser={handleUpdateUser}
//         />

//         {/* попап добавления новой карточки */}

//         <AddPlacePopup
//           isOpen={isAddPlacePopupOpen}
//           onClose={closeAllPopups}
//           onAddPlace={handleAddCardSubmit}
//         />
//         <InfoToolTip
//           isRegistered={IsRegistered}
//           isOpen={isInfoToolTipPopupOpen}
//           onClose={closeAllPopups}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;


