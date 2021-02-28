import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleCardName(e) {
    setCardName(e.target.value);
  }

  function handleCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmitCard(e) {
    e.preventDefault(
      props.onAddPlace({
        name: cardName,
        link: cardLink,
      })
    );
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonText="Создать"
      onSubmit={handleSubmitCard}
    >
      <div className="pop-up__field pop-up__field_type_name">
        <input
          className="pop-up__input pop-up__input_type_name"
          placeholder="Название"
          required
          minLength="1"
          maxLength="30"
          id="pop-up__input_type_name"
          name="name"
          onChange={handleCardName}
          value={cardName}
        />
        <span
          className="pop-up__error"
          id="pop-up__input_type_name-error"
        ></span>
      </div>
      <div className="pop-up__field pop-up__field_type_link">
        <input
          className="pop-up__input pop-up__input_type_image-link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          id="pop-up__input_type_image-link"
          name="link"
          onChange={handleCardLink}
          value={cardLink}
        />
        <span
          className="pop-up__error"
          id="pop-up__input_type_image-link-error"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
