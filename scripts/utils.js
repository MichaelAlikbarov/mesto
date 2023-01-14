const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupByClickingOn);
  document.addEventListener("keydown", closePopupByKeyEscape);
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("mousedown", closePopupByClickingOn);
  popupElement.removeEventListener("keydown", closePopupByKeyEscape);
};

const closePopupByClickingOn = (evt) => {
  if (evt.target == evt.currentTarget) {
    const currentEl = evt.target;
    closePopup(currentEl);
  }
};

const closePopupByKeyEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentEl = document.querySelector(".popup_opened");
    closePopup(currentEl);
  }
};

const settings = {
  formSelector: '.popup__input-info',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error_visible'
};

export {settings, openPopup, closePopupByClickingOn, closePopupByKeyEscape, closePopup}
