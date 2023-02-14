const popupImage = document.querySelector(".popup_image-open");
const popups = Array.from(document.querySelectorAll('.popup'));
const popupImageOpen = document.querySelector("#popup-image");
const popupTitleImage = popupImageOpen.querySelector(".popup__title_image-title");
const popupCardsImage = popupImageOpen.querySelector(".popup__image");

export {
  popupImage,
  popupTitleImage, popupCardsImage,
  popups, popupImageOpen,
      }
