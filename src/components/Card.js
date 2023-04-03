export default class Card {
  constructor({ data, userId, handleCardClick, handleTrashClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._isLiked = data.likes.some((like) => like._id === this._userId);
    this._likeCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.elements__title');
    this._elementPhoto = this._element.querySelector('.elements__photo');
    this._elementLikeCounter = this._element.querySelector('.elements__like-counter');
    this._elementTrash = this._element.querySelector('.elements__trash');
    this._elementLike = this._element.querySelector('.elements__like');

  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  };

  _hasHiddenTrashBtn() {
    if (this._userId !== this._ownerId) {
      this._elementTrash.remove();
    }
  }

  _addLike = () => {
    this._elementLike.classList.add('elements__like_active');
    this._isLiked = true;
    this._elementLikeCounter.textContent = this._likeCounter;
  }

  _removeLike = () => {
    this._elementLike.classList.remove('elements__like_active');
    this._isLiked = false;
    this._elementLikeCounter.textContent = this._likeCounter;
  }

  _setLikesCounter = (data) => {
    this._likeCounter = data.likes.length;
  }

  _removeCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleCardImageClick = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _handleTrashImageClick = () => {
    this._handleTrashClick(
      this._cardId,
      this._removeCard
      );
  }

  _handleLikeImageClick = () => {
    this._handleLikeClick(
      this._cardId,
      this._isLiked,
      this._addLike,
      this._removeLike,
      this._setLikesCounter
    );
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', this._handleCardImageClick);
    this._elementTrash.addEventListener('click', this._handleTrashImageClick);
    this._elementLike.addEventListener('click', this._handleLikeImageClick);

  }

  generateCard() {
    this._elementTitle.textContent = this._name;
    this._elementPhoto.alt = this._name;
    this._elementPhoto.src = this._link;
    this._elementLikeCounter.textContent = this._likeCounter;
    this._hasHiddenTrashBtn();

    if (this._isLiked) {
      this._addLike();
    }
    this._setEventListeners();

    return this._element;
  }
}
