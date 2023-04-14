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
  popupDeleteCard,
  popupEditAvatar,
  openPopupEditAvatar,
  formEditAvatar,
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([dataUser, dataCards]) => {
    profileTitle.textContent = dataUser.name;
    profileSubtitle.textContent = dataUser.about;
    userInfo.setAvatarInfo(dataUser.avatar);
    userId = dataUser._id;

    cardSection.renderItems(dataCards);
  })
  .catch(api.handleError)

const openPopupDeleteCard = new PopupWithConfirmation(popupDeleteCard);

const popapWithEditAvatar = new PopupWithForm(popupEditAvatar, {
  handleFormSubmit: (data) => {
    popapWithEditAvatar.renderLoading(true)
    api.updateAvatar(data.name)
      .then((res) => {
        userInfo.setAvatarInfo(res.avatar);
        popapWithEditAvatar.close()
      })
      .catch(api.handleError)
      .finally(() => {
        popapWithEditAvatar.renderLoading(false)
      })
  }
});

const popupCardImageOpen = new PopupWithImage(popupImageOpen);
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar',
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
      handleLikeCard: () => {
        if (card._likes.find((item) => item._id === userId)) {
          api.deleteLike(card._id)
          .then((res) => {
            card.deleteLike();
            card.calculateLikes(res.likes);
          })
          .catch(api.handleError)
        } else {
          api.addLike(card._id)
          .then((res) => {
          card.addLike();
          card.calculateLikes(res.likes)
          })
          .catch(api.handleError)
        }
      }
    }
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
    popupFormPlace.renderLoading(true)
    api.addNewCard(data)
    .then((data) => {
      cardSection.addItem(createCard(data, cardTemplate));
      popupFormPlace.close();
    })
    .catch(api.handleError)
    .finally(() => {
      popupFormPlace.renderLoading(false);
    });
  }
});

const popupFormProfile = new PopupWithForm(popupFormName, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    popupFormProfile.renderLoading(true)
    api.editProfileInfo({
      name: nameInput.value,
      about: jobInput.value,
    })
    .then(() => {
      popupFormProfile.close();
    })
    .catch(api.handleError)
    .finally(() => {
      popupFormProfile.renderLoading(false);
    });
  }
});

popupFormPlace.setEventListener();
popupFormProfile.setEventListener();
popupCardImageOpen.setEventListeners();
openPopupDeleteCard.setEventListeners();
popapWithEditAvatar.setEventListener();

const handleOpenProfileForm = () => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.userName;
  jobInput.value = userData.userDescription;
  popupFormProfile.open();
  formValidatorProfile.disableButton()
};

const formValidatorProfile = new FormValidator(validationConfig, formProfile);
formValidatorProfile.enableValidation(formProfile);
const formValidatorCard = new FormValidator(validationConfig, formAddCard);
formValidatorCard.enableValidation(formAddCard);
const formValidatorEditAvatar = new FormValidator(validationConfig, popupEditAvatar);
formValidatorEditAvatar.enableValidation(formEditAvatar);

popupFormNameOpenButton.addEventListener("click", handleOpenProfileForm);

cardPopupOpenButton.addEventListener("click", () => {
  popupFormPlace.open()
  formValidatorCard.disableButton();
});

openPopupEditAvatar.addEventListener("click", (evt) => {
  if (evt.target) {
    popapWithEditAvatar.open()
  }
  formValidatorEditAvatar.disableButton();
});
