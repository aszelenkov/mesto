export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.elements__title');
    this._photoElement = this._element.querySelector('.elements__photo');
    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__trash');
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  };

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle('elements__like_active');
  };

  _handleCardImageClick = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  _handleDeleteClick = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._photoElement.addEventListener('click', this._handleCardImageClick);
    this._deleteButton.addEventListener('click', this._handleDeleteClick);
  };

  generateCard() {
    this._titleElement.textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._setEventListeners();
    return this._element;
  };
};
