import initialCards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {settings, openPopup, closePopupByClickingOn, closePopupByKeyEscape, closePopup} from './utils.js'


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

const formAddCard = document.querySelector('#form-place');
const inputNameCard = popupAddCard.querySelector(".popup__info_type_place");
const inputLinkCard = popupAddCard.querySelector(".popup__info_type_link");
const buttonSubmitCardForm = formAddCard.querySelector(".popup__button");

const popupImage = document.querySelector(".popup_image-open");
const popupImageClose = popupImage.querySelector(".popup__close_image");

const handleOpenProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupFormName);
  const enablevalidation = new FormValidator(settings, popupFormNameElement);
  enablevalidation.enableValidation(settings)
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
  const card = new Card(inputValue, cardTemplate);
  cardsContainer.prepend(card.getVew());
  formAddCard.reset();
  closePopup(popupAddCard);
  buttonSubmitCardForm.classList.add("popup__button_disabled");
  buttonSubmitCardForm.setAttribute("disabled", "disabled");
};

const renderInitialCards = () => {
  initialCards.forEach((cardData) => {
    const cardItem = new Card(cardData, cardTemplate);
    cardsContainer.append(cardItem.getVew());
  });
};

popupFormNameOpenButton.addEventListener("click", handleOpenProfileForm);

popupFormNameCloseButton.addEventListener("click", () => {
  closePopup(popupFormName);
});
popupFormNameElement.addEventListener('submit', handleProfileFormSubmit);

cardPopupOpenButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  const enablevalidation = new FormValidator(settings, formAddCard);
  enablevalidation.enableValidation(settings);
});
cardPopupCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
  formAddCard.reset();
});

popupImageClose.addEventListener("click", () => {
  closePopup(popupImage)
});

formAddCard.addEventListener('submit', handleCardFormSubmit);

renderInitialCards ();

