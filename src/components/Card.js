class Card {
  constructor(data, templateSelector, userId, {handleCardClick, handleDeleteCardButtonClick,}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardButtonClick = handleDeleteCardButtonClick;
  }

  _getTemplateCard() {
    const cardItem = this._templateSelector
      .content.querySelector(".cards__card")
      .cloneNode(true);
    return cardItem;
  }

  addLike() {
    // evt.target.classList.add("cards__heart_active");
    console.log(123)
  }

  _handleLikeCard() {
    // evt.target.classList.toggle("cards__heart_active");
    const myLike = false;
    // if (myLike == true) {
    //   this.deleteLike()
    // }
    this.addLike()
    console.log("test")

  }

  _setEventListeners() {
    this._newCard.querySelector(".cards__delete")
    .addEventListener("click", () => this._handleDeleteCardButtonClick(this));

    this._newCard.querySelector(".cards__heart")
    .addEventListener("click", this._handleLikeCard)

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
    this._calculateLikes();
    this._showDeleteIcon();
    return this._newCard;
  }

  //сделать счетчик лайков
  _calculateLikes() {
    const quantityLikes = this._newCard.querySelector(".cards__quantity-like");
    quantityLikes.textContent = this._likes.length;
  };

  //убрать иконку делит с чужих карточек
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

  // deleteLike() {
  //   evt.target.classList.remove("cards__heart_active");
  // }
}

export default Card;
