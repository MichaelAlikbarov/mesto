import './pages/index.css';
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import {
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
  popupImageOpen,
} from "./utils/constants.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

const popupCardImageOpen = new PopupWithImage(popupImageOpen);
console.log(popupCardImageOpen)
const userInfo = new UserInfo({});

const createCard = (data, cardTemplate) => {
  const card = new Card (data, cardTemplate,
    {handleCardClick: () => {
        popupCardImageOpen.openImage(data.name, data.link);
      }
    }
);
  return card.getView()
};

const cardSection = new Section ({
  data: initialCards,
  renderer: (item)=> {
    createCard(item, cardTemplate);
    cardSection.addItem(createCard(item, cardTemplate));
  }},
  ".cards__list"
);
cardSection.renderItems();

const popupFormPlace = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (formValue) => {
    cardSection.addItem(createCard(formValue, cardTemplate));
  }
});

const popupFormProfile = new PopupWithForm(popupFormName, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, jobInput.value);
  }
});

popupFormPlace.setEventListener();
popupFormProfile.setEventListener();
popupCardImageOpen.setEventListeners();

const handleOpenProfileForm = () => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.userName;
  jobInput.value = userData.userDescription;
  popupFormProfile.open()
};

const formValidatorProfile = new FormValidator(validationConfig, formProfile);
formValidatorProfile.enableValidation(formProfile);
const formValidatorCard = new FormValidator(validationConfig, formAddCard);
formValidatorCard.enableValidation(formAddCard);

popupFormNameOpenButton.addEventListener("click", handleOpenProfileForm);

cardPopupOpenButton.addEventListener("click", () => {
  popupFormPlace.open()
  formValidatorCard.disableButton();
});
