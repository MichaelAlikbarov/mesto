import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup);
  }

  openImage(name, link) {
    super.open()
    // вставлять в попап картинку с src изображения и подписью к картинке
    this._popupTitleImage.textContent = name;
    this._popupCardsImage.src = link;
    this._popupCardsImage.alt = name;
  }
}
