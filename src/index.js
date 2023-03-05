import '../pages/index.css';
import initialCards from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {popups, popupImageOpen} from '../utils/utils.js';

import {settings} from "../utils/constants.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";

const popupFormName = document.querySelector("#popup-name");
const popupAddCard = document.querySelector(".popup_add-card");

const popupFormNameOpenButton = document.querySelector(".profile__open-popup");

const nameInput = popupFormName.querySelector(".popup__info_type_name");
const jobInput = popupFormName.querySelector(".popup__info_type_job");

const cardPopupOpenButton = document.querySelector(".profile__button");

const cardTemplate = document.querySelector(".template");
const formProfile = document.querySelector("#form-profile");
const formAddCard = document.querySelector('#form-place');

const popupProfile = new Popup(popupFormName);
const popupPlace = new Popup(popupAddCard);
const popupCardImageOpen = new PopupWithImage(popupImageOpen);
const userInfo = new UserInfo({});

const popupFormPlace = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (formValue) => {
    cardList.additem(createCard(formValue, cardTemplate));
  }
});

const popupFormProfile = new PopupWithForm(popupFormName, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput, jobInput);
  }
});

popupFormPlace.setEventListener();
popupFormProfile.setEventListener();

const handleOpenProfileForm = () => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.nameInput;
  jobInput.value = userData.jobInput;
  popupProfile.open()
};

const createCard = (data, templateSelector) => {
  const card = new Card (data, templateSelector,
    {handleCardClick: () => {
        popupCardImageOpen.openImage(data.name, data.link);
      }
    }
);
  return card.getVew()
};

const cardList = new Section ({
  data: initialCards,
  renderer: (item)=> {
    createCard(item, cardTemplate);
    cardList.additem(createCard(item, cardTemplate));
  }},
  ".cards__list"
);
cardList.renderItems();

//реализовать закрытие попапа нажатием на иконку(крестик)
popups.forEach((popupSelector) => {
  const popup = new Popup (popupSelector);
  popup.setEventListeners();
});


// один из вариантов включения валидации, если надо использовать больше двух форм
// const enableFormValidation = (params) => {
//   const formList = Array.from(document.querySelectorAll(params.formSelector));
//   formList.forEach((formItem) => {
//     const formValidator = new FormValidator(params, formItem);
//     formValidator.enableValidation(formItem);
//   });
// };
// enableFormValidation(settings);

const formValidatorProfile = new FormValidator(settings, formProfile);
formValidatorProfile.enableValidation(formProfile);
const formValidatorCard = new FormValidator(settings, formAddCard);
formValidatorCard.enableValidation(formAddCard);

popupFormNameOpenButton.addEventListener("click", handleOpenProfileForm);

cardPopupOpenButton.addEventListener("click", () => {
  popupPlace.open()
  formValidatorCard.disableButton();
});
