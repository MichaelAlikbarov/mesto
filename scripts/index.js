const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__open-popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupSaveButton = popup.querySelector(".popup__save");

let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let formElement = document.querySelector(".popup");
let nameInput = formElement.querySelector(".popup__info_name");
let jobInput = formElement.querySelector(".popup__info_job");

function formOpenHandler () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  console.log(nameInput.value);
};

const popupToggle = function (event) {
    popup.classList.toggle("popup_opened");
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
};

popupOpenButton.addEventListener("click", popupToggle, formOpenHandler());
popupCloseButton.addEventListener("click", popupToggle);
popupSaveButton.addEventListener("click", popupToggle);

formElement.addEventListener('submit', formSubmitHandler);

