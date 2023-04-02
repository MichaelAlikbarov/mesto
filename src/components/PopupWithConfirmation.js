import Popup from "./Popup.js"
export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".popup-delete-card__button")
    .addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }
}

