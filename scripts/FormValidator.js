import {disableButton, enableButton} from "./utils.js"

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

  _setEventListeners(formItem) {
    const inputList = Array.from(formItem.querySelectorAll(this._inputSelector));
    const buttonElement = formItem.querySelector(this._submitButtonSelector);

    this._toggleButtonState(buttonElement, inputList);
    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem)
        this._toggleButtonState(buttonElement, inputList);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  }

  _toggleButtonState = (buttonElement, inputList) => {
    if (this._hasInvalidInput(inputList)) {
      disableButton(buttonElement)
    } else {
      enableButton(buttonElement)
    }
  }

  enableValidation(formItem) {
    this._setEventListeners(formItem)
    return this._newFormValidator
  }
}

export default FormValidator;

