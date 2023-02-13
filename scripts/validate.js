const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (popupFormElement, popupInputElement, errorMessage, object) => {
  const popupErrorElement = popupFormElement.querySelector(`.${popupInputElement.id}-error`);
  popupInputElement.classList.add(object.inputErrorClass);
  popupErrorElement.textContent = errorMessage;
  popupErrorElement.classList.add(object.errorClass);
};

const hideInputError = (popupFormElement, popupInputElement, object) => {
  const popupErrorElement = popupFormElement.querySelector(`.${popupInputElement.id}-error`);
  popupInputElement.classList.remove(object.inputErrorClass);
  popupErrorElement.classList.remove(object.errorClass);
  popupErrorElement.textContent = '';
};

const checkInputValidity = (popupFormElement, popupInputElement, object) => {
  if (!popupInputElement.validity.valid) {
    showInputError(popupFormElement, popupInputElement, popupInputElement.validationMessage, object);
  } else {
    hideInputError(popupFormElement, popupInputElement, object);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInputElement) => {
    return !popupInputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(object.inactiveButtonClass, 'disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(object.inactiveButtonClass, 'disabled');
  }
};

const setEventListeners = (popupFormElement, object) => {
  const inputList = Array.from(popupFormElement.querySelectorAll(object.inputSelector));
  const buttonElement = popupFormElement.querySelector(object.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, object);
  popupFormElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, object);
    }, 0);
  });

  inputList.forEach((popupInputElement) => {
    popupInputElement.addEventListener('input', () => {
      checkInputValidity(popupFormElement, popupInputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((popupFormElement) => {
    popupFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupFormElement, object);
  });
};

enableValidation(formsConfig);
