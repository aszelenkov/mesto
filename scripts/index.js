//Функция открытия модальных окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalEscape());
};

//Функция закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalEscape());
};

//закрытие модальных окон по оверлею и кнопке закрытия
function closeModalMouse(popup) {
  return function (evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  };
};

//закрытие по клавише ESC
function closeModalEscape() {
  return function (evt) {
    if (evt.key === "Escape") {
      popupElement.forEach(popup => closePopup(popup));
    };
  };
};

//присвоение контейнера для закрытия модальных окон
function handleCloseModal(popup) {
  const closeMouse = closeModalMouse(popup);
  const closeEscape = closeModalEscape();
  popup.addEventListener('mousedown', closeMouse);
};

//при клике на кнопку закрытия модального окна
popupElement.forEach(popup => handleCloseModal(popup));
document.addEventListener('keydown', closeModalEscape());

//Открытие по кнопке модалки редактирования "Профиля"
popupButtonOpenEditElement.addEventListener('click', () => {
  popupFormInputProfileNameElement.value = profileNameElement.textContent;
  popupFormInputProfileAboutElement.value = profileAboutElement.textContent;
  openPopup(popupProfileEditElement);
});

//Обработчик отправки формы Профиля, закрытие по кнопке "Сохранить"
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupFormInputProfileNameElement.value;
  profileAboutElement.textContent = popupFormInputProfileAboutElement.value;
  closePopup(popupProfileEditElement);
};

//Добавление карточки
function createCard(item) {
  const card = templateElement.cloneNode(true);
    card.querySelector('.elements__title').textContent = item.name;
    card.querySelector('.elements__photo').src = item.link;
    card.querySelector('.elements__photo').alt = item.name;
    return card;
};

//Слушатель на карточки
cardsElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__like')) {
    evt.target.classList.toggle('elements__like_active');
  };
  if (evt.target.classList.contains('elements__photo')) {
    const photo = evt.target;
    popupItemPhotoViewName.src = photo.src;
    popupItemPhotoViewName.alt = photo.alt;
    popupItemPhotoViewCaption.textContent = photo.alt;
    openPopup(popupItemPhotoView);
  };
  if (evt.target.classList.contains('elements__trash')) {
    const card = evt.target.closest('.elements__item');
    card.remove();
  };
});

//Добавление первых 6 карточек из массива array-cards.js
function renderCards() {
  initialCards.forEach(({name, link}) => {
    cardsElement.append(createCard({name, link}))
  });
};
renderCards();

//Открытие по кнопке модалки добавления карточки
popupButtonOpenAddItemElement.addEventListener('click', () => {
  openPopup(popupItemCreateElement);
});

//Добавление карточки через форму
function handleFormSubmitItem(evt) {
  evt.preventDefault();
  const titleCard = popupFormInputItemNameElement.value;
  const linkCard = popupFormInputItemUrlElement.value;
  const card = createCard({ name: titleCard, link: linkCard });
  cardsElement.prepend(card);
  closePopup(popupItemCreateElement);
  evt.target.reset();
};
//Функция отображения ошибок
function errors() {
  const popupInput = Array.from(document.querySelectorAll('.popup__input'));
  const errorInput = Array.from(document.querySelectorAll('.popup__error'));
  errorInput.forEach((errorElement) =>
    (errorElement.textContent = ''));
  popupInput.forEach((inputElement) => {
    (inputElement.classList.remove('.popup__input_type_error'));
  });
};

//Слушатели формы  "Карточки"
popupFormCreateItemElement.addEventListener('submit', handleFormSubmitItem);
//Слушатели формы  "Профиля"
popupFormEditElement.addEventListener('submit', handleFormSubmitProfile);

