class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateCard() {
    const cardItem = this._templateSelector
      .content.querySelector(".cards__card")
      .cloneNode(true);
    return cardItem;

  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("cards__heart_active");
  }

  _setEventListeners() {
    this._newCard.querySelector(".cards__delete").addEventListener("click", () => this._handleDeleteCard());

    this._newCard.querySelector(".cards__heart").addEventListener("click", this._handleLikeCard)

    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  _setData() {
    const name = this._newCard.querySelector(".cards__name");
    name.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  getView() {
    this._newCard = this._getTemplateCard();
    this._cardImage = this._newCard.querySelector(".cards__foto");
    this._setEventListeners();
    this._setData();

    return this._newCard;
  }
}

export default Card;
