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
const formEditAvatar = document.querySelector('#form-edit-avatar')

const popupImage = document.querySelector(".popup_image-open");
const popupImageOpen = document.querySelector("#popup-image");
const popupDeleteCard = document.querySelector("#popup-delete-card");
const popupEditAvatar = document.querySelector("#popup-edit-avatar")

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const avatar = document.querySelector('.profile__avatar');
const openPopupEditAvatar = document.querySelector('.profile__avatar-container');
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
  popupImage,
  popupImageOpen,
  profileTitle,
  profileSubtitle,
  avatar,
  popupDeleteCard,
  popupEditAvatar,
  openPopupEditAvatar,
  formEditAvatar,
}
