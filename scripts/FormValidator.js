export default class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;

  };

  _showInputError = (popupInputElement, errorMessage) => {
    const popupErrorElement = this._formElement.querySelector(`.${popupInputElement.id}-error`);
    popupInputElement.classList.add(this._config.inputErrorClass);
    popupErrorElement.textContent = errorMessage;
    popupErrorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (popupInputElement,) => {
    const popupErrorElement = this._formElement.querySelector(`.${popupInputElement.id}-error`);
    popupInputElement.classList.remove(this._config.inputErrorClass);
    popupErrorElement.classList.remove(this._config.errorClass);
    popupErrorElement.textContent = '';
  };

  _checkInputValidity = (popupInputElement) => {
    if (!popupInputElement.validity.valid) {
      this._showInputError(popupInputElement, popupInputElement.validationMessage);
    } else {
      this._hideInputError(popupInputElement);
    };
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((popupInputElement) => {
      return !popupInputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'true');
      buttonElement.classList.add(this._config.inactiveButtonClass, 'disabled');
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._config.inactiveButtonClass, 'disabled');
    };
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach(popupInputElement => {
          this._hideInputError(popupInputElement);
        });
      }, 0);
    });

    inputList.forEach((popupInputElement) => {
      popupInputElement.addEventListener('input', () => {
        this._checkInputValidity(popupInputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach(popupInputElement => {
      this._hideInputError(popupInputElement);
    });
  };
};


