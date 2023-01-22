// import {settings} from "./constants.js";

const popupImage = document.querySelector(".popup_image-open");
const popups = Array.from(document.querySelectorAll('.popup'));
const popupImageOpen = document.querySelector("#popup-image");
const popupTitleImage = popupImageOpen.querySelector(".popup__title_image-title");
const popupCardsImage = popupImageOpen.querySelector(".popup__image");

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByKeyEscape);
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByKeyEscape);
};


const closePopupByClickingOn = (evt) => {
  if (evt.target === evt.currentTarget) {
  }
  closePopup(evt.target);
};

const closePopupByKeyEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentEl = document.querySelector(".popup_opened");
    closePopup(currentEl);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', closePopupByClickingOn)
});

// const disableButton = (buttonItem) => {
//   buttonItem.classList.add(settings.inactiveButtonClass);
//   buttonItem.setAttribute("disabled", true);

//   buttonItem.classList.add("popup__button_disabled");
//   buttonItem.setAttribute("disabled", "disabled");
// };

// const enableButton = (buttonItem) => {
//   buttonItem.classList.remove(settings.inactiveButtonClass);
//   buttonItem.removeAttribute("disabled");
//   buttonItem.classList.add(settings.activeButtonClass);
// };

export {
  openPopup, popupImage, closePopupByClickingOn,
  closePopupByKeyEscape, closePopup, popupTitleImage, popupCardsImage,
      }
