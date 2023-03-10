import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, {handleFormSubmit}) {
    super(popup);
    this._inputList = this._popup.querySelectorAll('.popup__info');
    this._popupInputInfo = this._popup.querySelector('.popup__input-info');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    //собрать данные всех полей формы и вернуть объект
    this._formValue = {};
    this._inputList.forEach((inputItem) => {
      this._formValue[inputItem.name] = inputItem.value;
    });
    return this._formValue;
  }

  setEventListener() {
    super.setEventListeners();
    //добавить обработчик сабмита формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close()
    //сбросить форму при закрытии попапа
    this._popupInputInfo.reset();
  }
}
