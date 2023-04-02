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
  popupImageOpen,
  profileSubtitle,
  profileTitle,
  avatar,
  popupDeleteCard,
} from "./utils/constants.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import PopupWithConfirmation from './components/PopupWithConfirmation.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '17eb9ce2-5843-4cb4-9bf4-714af091316e',
    'Content-Type': 'application/json',
  }
});

let userId = null;

api.getUserInfo()
  .then((dataUser) => {
    profileTitle.textContent = dataUser.name;
    profileSubtitle.textContent = dataUser.about;
    avatar.src = dataUser.avatar;
    userId = dataUser._id;
  })
  .catch(api.handleError)

api.getInitialCards()
  .then((dataCards) => {
      cardSection.renderItems(dataCards);
  })
  .catch(api.handleError)

const openPopupDeleteCard = new PopupWithConfirmation(popupDeleteCard);

const popupCardImageOpen = new PopupWithImage(popupImageOpen);
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle',
});

const createCard = (data, cardTemplate) => {
  const card = new Card (data, cardTemplate, userId,
    {
      handleCardClick: () => {
        popupCardImageOpen.openImage(data.name, data.link);
      },
      handleDeleteCardButtonClick: (card) => {
        openPopupDeleteCard.open();
        openPopupDeleteCard.setSubmitAction(() => {
          api.deleteCard(card._id)
          .then(() => {
            card.removeCard();
            openPopupDeleteCard.close();
          })
          .catch(api.handleError)
        })
      },
      addlike: () => {
        api.addLike(data._id)
        .then(() => {
          data.addLike()
          console.log(data)
        })
        .catch(api.handleError)
      },
      deleteLike: () => {
        api.deleteLike(data._id)
        .then(() => {
          data.deleteLike()
        })
        .catch(api.handleError)
      }
    },
    () => {},
    );
  return card.getView()
};

const cardSection = new Section ({
  renderer: (item) => {
    createCard(item, cardTemplate);
    cardSection.addItem(createCard(item, cardTemplate));
  }},
  ".cards__list"
);

const popupFormPlace = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (data) => {
    api.addNewCard(data)
    .then((data) => {
      cardSection.addItem(createCard(data, cardTemplate));
    })
    .catch(api.handleError)
  }
});

const popupFormProfile = new PopupWithForm(popupFormName, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    api.editProfileInfo({
      name: nameInput.value,
      about: jobInput.value
    })
    .catch(api.handleError)
  }
});

popupFormPlace.setEventListener();
popupFormProfile.setEventListener();
popupCardImageOpen.setEventListeners();
openPopupDeleteCard.setEventListeners();

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

