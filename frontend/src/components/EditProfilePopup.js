import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonText="Cохранить"
      onSubmit={handleSubmit}
    >
      <>
        <div className="pop-up__field pop-up__field_type_name">
          <input
            className="pop-up__input pop-up__input_type_name"
            placeholder=""
            required
            minLength="2"
            maxLength="40"
            id="pop-up__input_type_name"
            name="name"
            onChange={handleChangeName}
            value={name || ""}
          />
          <span
            className="pop-up__error"
            id="pop-up__input_type_name-error"
          ></span>
        </div>
        <div className="pop-up__field pop-up__field_type_description">
          <input
            className="pop-up__input pop-up__input_type_description"
            placeholder=""
            required
            minLength="2"
            maxLength="200"
            id="pop-up__input_type_description"
            name="description"
            onChange={handleChangeDescription}
            value={description || ""}
          />
          <span
            className="pop-up__error"
            id="pop-up__input_type_description-error"
          ></span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
