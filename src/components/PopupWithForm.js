import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._buttonForm = this._popup.querySelector('.popup__button-save');
    this._buttonFormText = this._buttonForm.textContent;
  };

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  };

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });
  };

  setSaveButtonText(isSaving) {
    if (isSaving) {
        this._buttonForm.textContent = 'Сохранение...';
      } else {
        this._buttonForm.textContent = this._buttonFormText;
      }
  }

  close() {
    super.close();
    this._popupForm.reset();
  };
};
