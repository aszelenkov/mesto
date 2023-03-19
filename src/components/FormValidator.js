export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._formInputsHandler = this._formInputsHandler.bind(this);
  };

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement);
  };

  _formInputsHandler(event) {
    if (event.target.matches(this._inputSelector)) {
      this._checkInputValidity(event.target);
      this._toggleButtonState();
    };
  };

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
    this._buttonElement.disabled = hasInvalidInput;
    this._buttonElement.classList.toggle(this._inactiveButtonClass, hasInvalidInput);
  };

  _resetFormHandler() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._formElement.addEventListener('input', this._formInputsHandler);
    this._formElement.addEventListener('reset', this._resetFormHandler.bind(this));
    this._toggleButtonState();
  };

  enableValidation() {
    this._setEventListeners();
  };

  resetErrors() {
    this._resetFormHandler();
  };
};
