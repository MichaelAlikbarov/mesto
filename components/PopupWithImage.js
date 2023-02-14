import {popupTitleImage, popupCardsImage} from "../utils/utils.js"
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  openImage(name, link) {
    super.open()
    // вставлять в попап картинку с src изображения и подписью к картинке
    popupTitleImage.textContent = name;
    popupCardsImage.src = link;
    popupCardsImage.alt = name;
    }
}
