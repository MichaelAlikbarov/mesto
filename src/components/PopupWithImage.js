import {popupTitleImage, popupCardsImage} from "../utils/constants.js"
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup);
  }

  openImage(name, link) {
    super.open()
    // вставлять в попап картинку с src изображения и подписью к картинке
    popupTitleImage.textContent = name;
    popupCardsImage.src = link;
    popupCardsImage.alt = name;
  }
}
