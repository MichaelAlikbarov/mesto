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

const popup = document.querySelector(".popup");
const popupAddCard = document.querySelector(".popup_add-card");
const popupImage = document.querySelector(".popup_image-open");
const popupImageClose = popupImage.querySelector(".popup__close_image");

const popupOpenButton = document.querySelector(".profile__open-popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupSaveButton = popup.querySelector(".popup__save");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".popup__input-info");
const nameInput = popup.querySelector(".popup__info_type_name");
const jobInput = popup.querySelector(".popup__info_type_job");

const addCardOpenButton = document.querySelector(".profile__button");
const addCardCloseButton = document.querySelector(".popup__close_add-card");

const template = document.querySelector(".template");
const container = document.querySelector(".cards__list");

const formAddCard = document.getElementById('place');
const inputNameCard = popupAddCard.querySelector(".popup__info_type_place");
const inputLinkCard = popupAddCard.querySelector(".popup__info_type_link");

function popupOpen () {
    popup.classList.add("popup_opened");
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

function popupClose () {
  popup.classList.remove("popup_opened");
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose ();
};

function addCardOpen () {
    popupAddCard.classList.add("popup_opened");
};

function addCardClose () {
    popupAddCard.classList.remove("popup_opened");
};

function imageCardOpen () {
  popupImage.classList.add("popup_opened");
};

function imageCardClose () {
  popupImage.classList.remove("popup_opened");
};

popupOpenButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
formElement.addEventListener('submit', formSubmitHandler);

addCardOpenButton.addEventListener("click", addCardOpen);
addCardCloseButton.addEventListener("click", addCardClose);
popupImageClose.addEventListener("click", imageCardClose);


const render = () => {
    initialCards.forEach(initialCards => {
    const currentItem = creatItemNode(initialCards.name, initialCards.link);
    container.append(currentItem);
  });
  formAddCard.addEventListener('submit', addCardHandler);
};

const creatItemNode = (name, link) => {
    const currentItem = template.content.cloneNode(true);
    const currentName = currentItem.querySelector(".cards__name");
    currentName.textContent = name;
    const currentLink = currentItem.querySelector(".cards__foto");
    currentLink.setAttribute("src", link);

    //заполнить попап с карточкой
    currentItem.querySelector(".cards__foto").addEventListener("click", function (evt) {
      evt.preventDefault();
      const popupCardsImage = popupImage.querySelector(".popup__image");
      const popupTitleImage = popupImage.querySelector(".popup__title_image-title");
      popupTitleImage.textContent = name;
      popupCardsImage.setAttribute("src", link);
      popupCardsImage.setAttribute("alt", name);
      imageCardOpen();
    });

    //добавить like
    currentItem.querySelector(".cards__heart").addEventListener("click", function (evt) {
      evt.target.classList.toggle("cards__heart_active");
    });
    //удалить карточку
    const deleteCard = currentItem.querySelector(".cards__delete");
    deleteCard.addEventListener("click", deleteCardHandler);

    return currentItem;
};

//удалить карточку
const deleteCardHandler = (evt) => {
  const currentEl = evt.target.closest(".cards__card");
  currentEl.remove();
};

const addCardHandler = (evt) => {
    evt.preventDefault();
    const card = creatItemNode(inputNameCard.value, inputLinkCard.value);
    container.prepend(card);
    inputNameCard.value = "";
    inputLinkCard.value = "";
    addCardClose ();
};

render ();
