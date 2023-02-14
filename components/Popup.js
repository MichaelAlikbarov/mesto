export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener('mousedown', this._closePopupByClickingOn)
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSelector.removeEventListener('mousedown', this._closePopupByClickingOn)
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
    const popupArray = document.querySelectorAll('.popup__close');
    popupArray.forEach((popupCloseIcon) => {
      popupCloseIcon.addEventListener("click", () => {
        this.close();
      });
    });
  }
}
