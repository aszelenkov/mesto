import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonForm = this._popup.querySelector('.popup__button-save');
    this._buttonFormText = this._buttonForm.textContent;
  };

  submitCallback(removing) {
    this._submitFormCallback = removing;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitFormCallback();
    });
  };

  setSaveButtonText(isSaving) {
    if (isSaving) {
        this._buttonForm.textContent = 'Удаление...';
      } else {
        this._buttonForm.textContent = this._buttonFormText;
      };
  };

};
