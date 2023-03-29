export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._setEventListeners();
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  };

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle('elements__like_active');
  };

  _handleCardImageClick = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  // _removeItem = () => {
  //   this._element.remove();
  // }

  _handleDeleteClick = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', this._handleLikeClick);
    this._element
      .querySelector('.elements__photo')
      .addEventListener('click', this._handleCardImageClick);
    this._element
      .querySelector('.elements__trash')
      .addEventListener('click', this._handleDeleteClick);
  };

  generateCard() {
    const titleElement = this._element.querySelector('.elements__title');
    const photoElement = this._element.querySelector('.elements__photo');

    titleElement.textContent = this._name;
    photoElement.src = this._link;
    photoElement.alt = this._name;

    return this._element;
  };
};
