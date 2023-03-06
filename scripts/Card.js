  export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._popupItemPhotoView = document.querySelector('.popup_item_photo-view');
    this._popupItemPhotoViewName = this._popupItemPhotoView.querySelector('.popup__photo');
    this._popupItemPhotoViewCaption = this._popupItemPhotoView.querySelector('.popup__photo-caption');
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

  _handleCardClick(evt) {
    this._popupItemPhotoViewName.setAttribute('src', evt.target.getAttribute('src'));
    this._popupItemPhotoViewName.setAttribute('alt', `${this._name}`);
    this._popupItemPhotoViewCaption.textContent = this._name;
    this._openPopup(this._popupItemPhotoView);
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
