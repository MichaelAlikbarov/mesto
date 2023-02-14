import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    //собрать данные всех полей формы и вернуть объект
    this._inputList = this._popupSelector.querySelectorAll('.popup__info');
    this._formValue = {};
    this._inputList.forEach((inputItem) => {
      this._formValue[inputItem.name] = inputItem.value;
    });
    return this._formValue;
  }

  setEventListener() {
    super.setEventListeners();
    //добавить обработчик сабмита формы
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close()
    //сбросить форму при закрытии попапа
    this._popupSelector.querySelector('.popup__input-info').reset();
    this._popupSelector.parentNode.classList.remove("popup_opened");
  }
}
