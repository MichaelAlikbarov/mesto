
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

  _setEventListeners(formItem) {
    this._inputList = Array.from(formItem.querySelectorAll(this._inputSelector));
    this._buttonElement = formItem.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._buttonElement, this._inputList);
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem)
        this._toggleButtonState(this._buttonElement, this._inputList);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.remove(this._activeButtonClass);
  };

  _enableButton = (buttonItem) => {
    buttonItem.classList.remove(this._inactiveButtonClass);
    buttonItem.removeAttribute("disabled");
    buttonItem.classList.add(this._activeButtonClass);
  };

  _toggleButtonState = (buttonElement, inputList) => {
    if (this._hasInvalidInput(inputList)) {
    this.disableButton(buttonElement)
    } else {
      this._enableButton(buttonElement)
    }
  }

  enableValidation(formItem) {
    this._setEventListeners(formItem)
    return this._newFormValidator
  }
}

export default FormValidator;

