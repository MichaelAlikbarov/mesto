export default class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
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
