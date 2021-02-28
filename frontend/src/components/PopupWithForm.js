import React from "react";

function PopupWithForm(props) {
  const {
    title,
    name,
    isOpen,
    onClose,
    submitButtonText,
    onSubmit,
    children,
  } = props;

  return (
    <section
      className={
        isOpen
          ? ` pop-up pop-up-${name} pop-up_opened`
          : `pop-up pop-up-${name}`
      }
    >
      <form
        className={`pop-up__container pop-up__form_type_${name}`}
        action=""
        method="post"
        name="enter"
        noValidate
        onSubmit={onSubmit}
      >
        <button
          className="pop-up__close-button pop-up__profile-close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="pop-up__title">{title}</h2>

        {children}
        <button
          className="pop-up__submit-button pop-up__profile-submit-button"
          type="submit"
        >
          {submitButtonText}
        </button>
      </form>
      <div className="pop-up__overlay pop-up__overlay_type_profile"></div>
    </section>
  );
}

export default PopupWithForm;
