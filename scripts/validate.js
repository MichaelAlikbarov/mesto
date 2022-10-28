//получить элементы и формы

//повесить слушатель на сабмит формы

//слушатель проверяет каждый инпут в форме на валидность и если есть ошибка, вставляет код в тег спан

const form = document.forms;
const formProfile = form.profile;
const formPlace = form.place;

const nameInputForm = formProfile.querySelector("#name");
const jobInputForm = formProfile.querySelector("#about");
const placeInput = formPlace.querySelector("#form-place");
const urlPlaceInput = formPlace.querySelector("#url-place");

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

// const validateInput = (inputItem) => {
//   console.log(inputItem.id);
//   const errorItem = forms.querySelector(`#${inputItem.id}-error`)
//   if (inputItem.checkValidity()) {
//     console.log("input valid");
//   } else {
//     console.log("input not valid");
//     errorItem.textContent = inputItem.validationMessage;
//   }
// };

// const validateForm = (evt) => {
//   evt.preventDefault();

//   validateInput(nameInputForm);
//   validateInput(jobInputForm);
//   validateInput(placeInput);
//   validateInput(urlPlaceInput);

//   if (forms.checkValidity()) {
//     console.log("valid");
//     evt.target.reset();//вариант forms.reset()
//   } else {
//     console.log("not valid");
//   }
// };

// form.addEventListener('submit', validateForm);

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
