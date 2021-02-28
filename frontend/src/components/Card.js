import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button  ${
    isLiked && "element__like-button_clicked"
  }`;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn
      ? "element__delete-button_type_visible"
      : "element__delete-button_type_hidden"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="template-element">
      <li className="element">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <div className="element__info">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <p className="element__like-count">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
