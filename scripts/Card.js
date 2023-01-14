class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _getTemplateCard() {
    const cardItem = document
      .querySelector(".template")
      .content
      .cloneNode(true);
    return cardItem;

  };

  _handleDeleteCard(evt) {
    const currentEl = evt.target.closest(".cards__card");
    currentEl.remove();
  };

  _handleOpenPopupCard() {
    const popupImageOpen = document.querySelector("#popup-image");
    const popupTitleImage = popupImageOpen.querySelector(".popup__title_image-title");
    const popupCardsImage = popupImageOpen.querySelector(".popup__image");
    popupTitleImage.textContent = this._name;
    popupCardsImage.src = this._link;
    popupCardsImage.alt = this._name;
    const popupImage = document.querySelector(".popup_image-open");
    openPopup(popupImage);

  };

  _setEventListeners() {
    const buttonDeleteCard = this._newCard.querySelector(".cards__delete");
    buttonDeleteCard.addEventListener("click", this._handleDeleteCard);

    this._newCard.querySelector(".cards__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__heart_active");
    });

    this._newCard.querySelector(".cards__foto").addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleOpenPopupCard();
    });
  };

  _setData() {
    const name = this._newCard.querySelector(".cards__name");
    name.textContent = this._name;
    const link = this._newCard.querySelector(".cards__foto");
    link.src = this._link;
    link.alt = this._name;
  };

  getVew() {
    this._newCard = this._getTemplateCard();
    this._setEventListeners();
    this._setData();

    return this._newCard;
  };
}

export default Card;
import {openPopup, closePopupByClickingOn, closePopupByKeyEscape, closePopup} from './utils.js'
