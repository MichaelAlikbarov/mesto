export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _closePopupByClickingOn = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    const popupCloseIcon = this._popup.querySelector('.popup__close');
    popupCloseIcon.addEventListener("click", () => {
      this.close();
     });
     this._popup.addEventListener('mousedown', this._closePopupByClickingOn);
  }
}
