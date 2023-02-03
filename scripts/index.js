//Функция открытия модальных окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Обработчик и закрытие модалок
popupElement.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

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

//Добавление карточки, лайк, открытие модалки, удаление
function createCard(item) {
  const card = templateElement.cloneNode(true);
    card.querySelector('.elements__title').textContent = item.name;
    card.querySelector('.elements__photo').src = item.link;
    card.querySelector('.elements__photo').alt = item.name;
    card.querySelector('.elements__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like_active');
      });
    card.querySelector('.elements__photo').addEventListener('click', () => {
      popupItemPhotoViewName.src = item.link;
      popupItemPhotoViewName.alt = item.name;
      popupItemPhotoViewCaption.textContent = item.name;
      openPopup(popupItemPhotoView);
      });
      card.querySelector('.elements__trash').addEventListener('click', () => {
        card.remove(item);
      });
  return card;
};

//Добавление первых 6 карточек из массива array-cards.js
function renderCards() {
  initialCards.forEach((item) => {
    cardsElement.append(createCard(item));
  });
};
renderCards();

//Открытие по кнопке модалки добавления карточки
popupButtonOpenAddItemElement.addEventListener('click', () => {
  openPopup(popupItemCreateElement);
});

//Добавление карточки через форму
function handleFormSubmitItem (evt) {
  evt.preventDefault();
  const titleCard = popupFormInputItemNameElement.value;
  const linkCard = popupFormInputItemUrlElement.value;
  const card = createCard({name: titleCard, link: linkCard});
  cardsElement.prepend(card);
  closePopup(popupItemCreateElement);
  popupFormCreateItemElement.reset();
};

//Слушатели формы  "Карточки"
popupFormCreateItemElement.addEventListener('submit', handleFormSubmitItem);
//Слушатели формы  "Профиля"
popupFormEditElement.addEventListener('submit', handleFormSubmitProfile);
