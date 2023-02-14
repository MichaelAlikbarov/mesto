export default class UserInfo {
  constructor({userName, userDescription}) {
    userName = document.querySelector(".profile__title");
    userDescription = document.querySelector(".profile__subtitle");
    this._userName = userName;
    this._userDescription = userDescription;
  }

  getUserInfo() {
   return  {
    nameInput: this._userName.textContent,
    jobInput: this._userDescription.textContent,
   }
  }

  setUserInfo(nameInput, jobInput) {
    this._userName.textContent = nameInput.value;
    this._userDescription.textContent = jobInput.value;
  }
}
