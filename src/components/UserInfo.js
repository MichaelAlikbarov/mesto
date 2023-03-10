export default class UserInfo {
  constructor({}) {
    this._userName = document.querySelector(".profile__title");
    this._userDescription = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
   return  {
    userName: this._userName.textContent,
    userDescription: this._userDescription.textContent,
   }
  }

  setUserInfo(userName, userDescription) {
    this._userName.textContent = userName;
    this._userDescription.textContent = userDescription;
  }
}
