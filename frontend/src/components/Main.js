import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "../components/Card";
import Header from "../components/Header"

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content">
      {/* <Header email = {props.email} onOut={props.onOut}/> */}
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={"userAvatar"}
          />
          <div className="profile__layout">
            <button
              className="profile__edit-avatar"
              onClick={props.onEditAvatar}
            ></button>
          </div>
        </div>

        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <ul className="elements">
        {props.cards.map((card) => {
     
          return (
            <Card
              key={card._id}
              card={card}
              onClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
