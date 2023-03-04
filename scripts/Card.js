
import { openPopup,
  popupItemPhotoView,
  popupItemPhotoViewName,
  popupItemPhotoViewCaption } from './index.js';

  export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  };


  _handleLikeClick() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  };

  _handleCardClick() {
    popupItemPhotoViewName.src = this._link;
    popupItemPhotoViewName.alt = this._name;
    popupItemPhotoViewCaption.textContent = this._name;
    openPopup(popupItemPhotoView);
  };

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.elements__photo').addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._handleDeleteClick();
    });
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__photo').src = this._link;
    this._element.querySelector('.elements__photo').alt = this._name;
    this._setEventListeners();
    return this._element;
  };
};
