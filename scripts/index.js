const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__open-popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupSaveButton = popup.querySelector(".popup__save");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".popup__input-info");
const nameInput = popup.querySelector(".popup__info_type_name");
const jobInput = popup.querySelector(".popup__info_type_job");

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

popupOpenButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
formElement.addEventListener('submit', formSubmitHandler);

