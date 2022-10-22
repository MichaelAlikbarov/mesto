const popupFormName = document.getElementById("popup-name");
const popupAddCard = document.querySelector(".popup_add-card");

const popupFormNameOpenButton = document.querySelector(".profile__open-popup");
const popupFormNameCloseButton = popupFormName.querySelector(".popup__close");
const popupFormNameSaveButton = popupFormName.querySelector(".popup__save");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupFormNameElement = document.querySelector(".popup__input-info");
const nameInput = popupFormName.querySelector(".popup__info_type_name");
const jobInput = popupFormName.querySelector(".popup__info_type_job");

const cardPopupOpenButton = document.querySelector(".profile__button");
const cardPopupCloseButton = document.querySelector(".popup__close_add-card");

const cardTemplate = document.querySelector(".template");
const cardsContainer = document.querySelector(".cards__list");


const formAddCard = document.getElementById('place');
const inputNameCard = popupAddCard.querySelector(".popup__info_type_place");
const inputLinkCard = popupAddCard.querySelector(".popup__info_type_link");

const popupImage = document.querySelector(".popup_image-open");
const popupImageClose = popupImage.querySelector(".popup__close_image");
const popupCardsImage = popupImage.querySelector(".popup__image");
const popupTitleImage = popupImage.querySelector(".popup__title_image-title");
const popupContainerImage = popupImage.querySelector(".popup__container_image");
console.log(popupContainerImage);

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
};

const handleOpenProfileForm = () => {
    openPopup(popupFormName);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
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
        inputNameCard.reset();
        inputLinkCard.value = "";
        closePopup(popupAddCard);
};

const handleDeleteCard = (evt) => {
  const currentEl = evt.target.closest(".cards__card");
  currentEl.remove();
};

const renderInitialCards = () => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem.name, cardItem.link);
    cardsContainer.append(cardData);
  });
};

const createCard = (name, link) => {
  const cardData = cardTemplate.content.cloneNode(true);
  const cardItemName = cardData.querySelector(".cards__name");
  const cardItemImage = cardData.querySelector(".cards__foto");
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
cardData.querySelector(".cards__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__heart_active");
});

//удалить карточку
const deleteCard = cardData.querySelector(".cards__delete");
deleteCard.addEventListener("click", handleDeleteCard);

return cardData;
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
});
popupImageClose.addEventListener("click", () => {
  closePopup(popupImage)
});
formAddCard.addEventListener('submit', handleCardFormSubmit);
popupContainerImage.addEventListener("click", () => {
  closePopup(popupImage)
});

renderInitialCards ();
