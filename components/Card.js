class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateCard() {
    const cardItem = document
      .querySelector(".template")
      .content.querySelector(".cards__card")
      .cloneNode(true);
    return cardItem;

  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._cardItem = null;
  }

  _setEventListeners() {
    this._buttonDeleteCard = this._newCard.querySelector(".cards__delete");
    this._buttonDeleteCard.addEventListener("click", () => this._handleDeleteCard());

    this._newCard.querySelector(".cards__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__heart_active");
    });

    this._cardImage.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleCardClick();
    })
  }

  _setData() {
    const name = this._newCard.querySelector(".cards__name");
    name.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  getVew() {
    this._newCard = this._getTemplateCard();
    this._cardImage = this._newCard.querySelector(".cards__foto");
    this._setEventListeners();
    this._setData();

    return this._newCard;
  }
}

export default Card;
