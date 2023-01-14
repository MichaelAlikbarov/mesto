import {settings, openPopup, closePopupByClickingOn, closePopupByKeyEscape, closePopup} from './utils.js'

class FormValidator {
  constructor(settings, itemFormValid) {
    this._settings = settings;
    this._itemFormValid = itemFormValid;
  }

  _isValid(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(formElement, inputItem, settings)
        this._toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = (inputList, buttonElement, settings) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formItem) => {
    this._setEventListeners(formItem, settings);
    });
    return this._newFormValidator
  }
}

export default FormValidator;

