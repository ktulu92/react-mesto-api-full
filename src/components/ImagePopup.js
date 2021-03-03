function ImagePopup({ card, onClose }) {
  return (
    <section className={`pop-up pop-up_type_image ${card && "pop-up_opened"}`}>
      <figure className="pop-up_container_type_image">
        <img
          className="pop-up__image"
          alt={card && card.name}
          src={card && `${card.link}`}
        />
        <button
          className="pop-up__close-button pop-up__image-close-button"
          onClick={onClose}
        ></button>
        <h4 className="pop-up__image-title">{card && card.name}</h4>
        <div className="pop-up__overlay pop-up__overlay_type_image"></div>
      </figure>
    </section>
  );
}

export default ImagePopup;
