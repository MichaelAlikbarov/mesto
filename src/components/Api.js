export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleRequest(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`)
  }

  handleError(error) {
    console.log(error);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleRequest)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleRequest)
  }

  editProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
    .then(this._handleRequest)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleRequest)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleRequest)
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleRequest)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleRequest)
  }

  updateAvatar(avatarNew) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarNew,
      }),
    })
    .then(this._handleRequest)
  }
}
