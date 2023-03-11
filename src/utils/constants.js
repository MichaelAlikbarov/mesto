const validationConfig = {
  formSelector: '.popup__input-info',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  activeButtonClass: 'popup__button_enable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error_visible'
};

const popupFormName = document.querySelector("#popup-name");
const popupAddCard = document.querySelector(".popup_add-card");
const popupFormNameOpenButton = document.querySelector(".profile__open-popup");
const nameInput = popupFormName.querySelector(".popup__info_type_name");
const jobInput = popupFormName.querySelector(".popup__info_type_job");
const cardPopupOpenButton = document.querySelector(".profile__button");
const cardTemplate = document.querySelector(".template");
const formProfile = document.querySelector("#form-profile");
const formAddCard = document.querySelector('#form-place');

const popupImage = document.querySelector(".popup_image-open");
const popupImageOpen = document.querySelector("#popup-image");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  validationConfig,
  popupFormName,
  popupAddCard,
  popupFormNameOpenButton,
  nameInput,
  jobInput,
  cardPopupOpenButton,
  cardTemplate,
  formProfile,
  formAddCard,
  initialCards,
  popupImage,
  popupImageOpen,
}
