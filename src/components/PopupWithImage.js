import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup);
    this._popupTitleImage = this._popup.querySelector('.popup__title_image-title');
    this._popupCardsImage = this._popup.querySelector('.popup__image');
  }

  openImage(name, link) {
    super.open()
    // вставлять в попап картинку с src изображения и подписью к картинке
    this._popupTitleImage.textContent = name;
    this._popupCardsImage.src = link;
    this._popupCardsImage.alt = name;
  }
}
