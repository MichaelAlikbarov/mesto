
class FormValidator {
  constructor(params, formItem) {
    this._params = params;
    this._formSelector = params.formSelector;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._activeButtonClass = params.activeButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
    this._formItem = formItem;
    this._buttonElement = params.buttonElement;
    this._inputList = params.inputList;
  }

  _isValid(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputItem) {
    const errorElement = this._formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formItem.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._buttonElement, this._inputList);
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem)
        this._toggleButtonState(this._buttonElement, this._inputList);
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  }

  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.remove(this._activeButtonClass);
  };

  _enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.add(this._activeButtonClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
    this.disableButton(this._buttonElement)
    } else {
      this._enableButton(this._buttonElement)
    }
  }

  enableValidation() {
    this._setEventListeners()
    return this._newFormValidator
  }
}

export default FormValidator;

