import initialCards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {openPopup, closePopup, popupImage, disableButton} from './utils.js';
import {settings} from "./constants.js";

const popupFormName = document.querySelector("#popup-name");
const popupAddCard = document.querySelector(".popup_add-card");

const popupFormNameOpenButton = document.querySelector(".profile__open-popup");
const popupFormNameCloseButton = popupFormName.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupFormNameElement = document.querySelector(".popup__input-info");
const nameInput = popupFormName.querySelector(".popup__info_type_name");
const jobInput = popupFormName.querySelector(".popup__info_type_job");

const cardPopupOpenButton = document.querySelector(".profile__button");
const cardPopupCloseButton = document.querySelector(".popup__close_add-card");

const cardTemplate = document.querySelector(".template");
const cardsContainer = document.querySelector(".cards__list");

const formProfile = document.querySelector("#form-profile");
const formAddCard = document.querySelector('#form-place');
const inputNameCard = popupAddCard.querySelector(".popup__info_type_place");
const inputLinkCard = popupAddCard.querySelector(".popup__info_type_link");
const buttonSubmitCardForm = formAddCard.querySelector(".popup__button");

const popupImageClose = popupImage.querySelector(".popup__close_image");

const handleOpenProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupFormName);

};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup (popupFormName);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const inputValue = ({name: inputNameCard.value, link: inputLinkCard.value});
  cardsContainer.prepend(createCard(inputValue, cardTemplate));
  formAddCard.reset();
  closePopup(popupAddCard);
  disableButton(buttonSubmitCardForm);
};

const createCard = (data, templateSelect) => {
  const card = new Card (data, templateSelect);
  return card.getVew()
};

const renderCards = () => {
  initialCards.forEach((cardData) => {
    cardsContainer.prepend(createCard(cardData, cardTemplate));
  });
};

const enableFormValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formItem) => {
    const formValidator = new FormValidator(params, formItem);
    formValidator.enableValidation(formItem);
  });
};

enableFormValidation(settings);

const formValidator = new FormValidator(settings, formProfile);
formValidator.enableValidation(formProfile);

popupFormNameOpenButton.addEventListener("click", handleOpenProfileForm);

popupFormNameCloseButton.addEventListener("click", () => {
  closePopup(popupFormName);
});

popupFormNameElement.addEventListener('submit', handleProfileFormSubmit);

cardPopupOpenButton.addEventListener("click", () => {
  openPopup(popupAddCard);

});

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
  formAddCard.reset();
});

popupImageClose.addEventListener("click", () => {
  closePopup(popupImage)
});

formAddCard.addEventListener('submit', handleCardFormSubmit);

renderCards ();


