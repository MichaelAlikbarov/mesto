const popupFormName = document.getElementById("popup-name");
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

const formAddCard = document.getElementById('form-place');
const inputNameCard = popupAddCard.querySelector(".popup__info_type_place");
const inputLinkCard = popupAddCard.querySelector(".popup__info_type_link");

const popupImage = document.querySelector(".popup_image-open");
const popupImageClose = popupImage.querySelector(".popup__close_image");
const popupCardsImage = popupImage.querySelector(".popup__image");
const popupTitleImage = popupImage.querySelector(".popup__title_image-title");

const closePopupByClickingOn = (evt) => {
  if (evt.target == evt.currentTarget) {
    const currentEl = evt.target;
    currentEl.classList.remove("popup_opened");
  }
};

const closePopupByKeyEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentEl = document.querySelector(".popup_opened");
    currentEl.classList.remove("popup_opened");
  }
};

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("click", closePopupByClickingOn);
  popupElement.addEventListener("keydown", closePopupByKeyEscape);
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("click", closePopupByClickingOn);
  popupElement.removeEventListener("keydown", closePopupByKeyEscape);
};

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
  const card = createCard(inputNameCard.value, inputLinkCard.value);
  cardsContainer.prepend(card);
  formAddCard.reset();
  closePopup(popupAddCard);
};

const handleDeleteCard = (evt) => {
  const currentEl = evt.target.closest(".cards__card");
  currentEl.remove();
};

const renderInitialCards = () => {
  initialCards.forEach((cardData) => {
    const cardItem = createCard(cardData.name, cardData.link);
    cardsContainer.append(cardItem);
  });
};

const createCard = (name, link) => {
  const cardItem = cardTemplate.content.cloneNode(true);
  const cardItemName = cardItem.querySelector(".cards__name");
  const cardItemImage = cardItem.querySelector(".cards__foto");
  cardItemImage.src = link;
  cardItemImage.alt = name;
  cardItemName.textContent = name;

  //заполнить попап с карточкой
  cardItemImage.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupTitleImage.textContent = name;
    popupCardsImage.src = link;
    popupCardsImage.alt = name;
    openPopup(popupImage);
  });

  //добавить like
  cardItem.querySelector(".cards__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__heart_active");
  });

  //удалить карточку
  const buttonDeleteCard = cardItem.querySelector(".cards__delete");
  buttonDeleteCard.addEventListener("click", handleDeleteCard);
  return cardItem;
};

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

document.addEventListener("keydown", closePopupByKeyEscape);

renderInitialCards ();
