import React from "react";

import okImage from "../images/Yes.svg"; //поменять 
import errorImage from "../images/No.svg"; //поменять названия 
function InfoToolTip(props) {


  return (
    <section
      className={ props.isOpen
            ? ` pop-up  pop-up_opened`
            : `pop-up `
        }
    >
      <form
        className={"pop-up__container "}
        action=""
        method="post"
        name="enter"
        noValidate
      
      >
        <button
          className="pop-up__close-button pop-up__profile-close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="info-tool-tip">
          <div className="info-tool-tip__container">
            <img alt = "succes-or-fail" src={props.isRegistered ? okImage : errorImage}></img>
            <h3 className="info-tool-tip__title">{props.isRegistered ? "Вы успешно зарегистрировались" 
            : "Что то пошло нетак! Попроубйте еще раз!"}</h3>
          </div>
        </div>
      </form>
      <div className="pop-up__overlay pop-up__overlay_type_profile"></div>
    </section>
  );
}

export default InfoToolTip;
