const popupOpenButton = document.querySelector(".profile__open-popup");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupSaveButton = popup.querySelector(".popup__save")

const popupToggle = function (event) {
  popup.classList.toggle("popup_opened");
  console.log("нажали на кнопку");
};

popupOpenButton.addEventListener("click", popupToggle);
popupCloseButton.addEventListener("click", popupToggle);
popupSaveButton.addEventListener("click", popupToggle);

let formElement = document.querySelector(".popup");
let nameInput = formElement.querySelector(".popup__name");
let jobInput = formElement.querySelector(".popup__info");

function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    let profileTitle = document.querySelector(".profile__title");
    let profileSubtitle = document.querySelector(".profile__subtitle");

    profileTitle.textContent = name;
    profilesubTitle.textContent = job;
}

formElement.addEventListener('submit', formSubmitHandler);

