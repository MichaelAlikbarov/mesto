class Card {
  constructor(data, templateSelector, userId, {handleCardClick, handleDeleteCardButtonClick, handleLikeCard}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardButtonClick = handleDeleteCardButtonClick;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplateCard() {
    const cardItem = this._templateSelector
      .content.querySelector(".cards__card")
      .cloneNode(true);
    return cardItem;
  }

  _setEventListeners() {
    this._newCard.querySelector(".cards__delete")
    .addEventListener("click", () => this._handleDeleteCardButtonClick(this));

    this._newCard.querySelector(".cards__heart")
    .addEventListener("click", () => this._handleLikeCard(this))

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
    this.calculateLikes(this._likes);
    this._showDeleteIcon();
    this._likeToogle();
    return this._newCard;
  }

  calculateLikes(likes) {
    this._likes = likes;
    const quantityLikes = this._newCard.querySelector(".cards__quantity-like");
    quantityLikes.textContent = this._likes.length;
  };

  _showDeleteIcon() {
    if (this._userId !== this._ownerId) {
      const itemDeleteIcon = this._newCard.querySelector(".cards__delete")
      itemDeleteIcon.remove("cards__delete");
    }
  }

  removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  addLike() {
    this._newCard.querySelector(".cards__heart")
    .classList.add("cards__heart_active");
  }

  deleteLike() {
    this._newCard.querySelector(".cards__heart")
    .classList.remove("cards__heart_active");
  }

  _likeToogle() {
    if (this._likes.find((item) => item._id === this._userId)) {
      this.addLike()
    }
  }
}

export default Card;
