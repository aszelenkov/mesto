//Профиль
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
//Карточка название и ссылка на картинку
const itemNameElement = document.querySelector('.elements__title')
const itemPhotoUrlElement = document.querySelector('.elements__photo')
//Модальные окна
const popupProfileEditElement = document.querySelector('.popup_edit');
const popupItemCreateElement = document.querySelector('.popup_item');
const popupItemPhotoView = document.querySelector('.popup_item_photo-view');
//Кнопки открытия Модальных окон
const popupButtonOpenEditElement = document.querySelector('.profile__button-edit');
const popupButtonOpenAddItemElement = document.querySelector('.profile__button-add-item');
const popupButtonOpenItemPhotoViewElement = document.querySelector('.elements__photo')
//Кнопки закрытия Модальных окон
const popupButtonSaveEditProfile = document.querySelector('.popup__button-save_edit')
const popupButtonCloseEditElement = popupProfileEditElement.querySelector('.popup__button-close');
const popupButtonCloseAddItemElement = popupItemCreateElement.querySelector('.popup__button-close');
const popupButtonCloseItemPhotoViewElement = popupItemPhotoView.querySelector('.popup__button-close');
//Объявление форм и полей "профиля"
const popupFormEditElement = popupProfileEditElement.querySelector('.popup__form_edit-profile');
const popupFormInputProfileNameElement = popupFormEditElement.querySelector('.popup__input_profile_name');
const popupFormInputProfileAboutElement = popupFormEditElement.querySelector('.popup__input_profile_about');
//Объявление формы и полей формы "карточки"
const popupFormCreateItemElement = popupItemCreateElement.querySelector('.popup__form_item-add')
const popupFormInputItemNameElement = popupFormCreateItemElement.querySelector('.popup__input_item_title');
const popupFormInputItemUrlElement = popupFormCreateItemElement.querySelector('.popup__input_item_url');
//Объявление кнопок удаления и лайка "карточки"
const itemButtonDeleteElement = document.querySelector('.elements__trash');
const itemButtonLikeElement = document.querySelector('.elements__like');
//Шаблон карточки
const templateElement = document.querySelector('.item-template').content.querySelector('.elements__item');
const cardsElement = document.querySelector('.elements__cards');
//Popup PhotoView
const popupItemPhotoViewName = popupItemPhotoView.querySelector('.popup__photo');
const popupItemPhotoViewCaption = popupItemPhotoView.querySelector('.popup__photo-caption');

//Универсальная функция открытия и закрытия модальных окон
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
};

//Открытие по кнопке модалки редактирования "Профиля"
popupButtonOpenEditElement.addEventListener('click', function () {
  togglePopup(popupProfileEditElement);
  popupFormInputProfileNameElement.value = profileNameElement.textContent;
  popupFormInputProfileAboutElement.value = profileAboutElement.textContent;
});

//Закрытие по кнопке модального окна Профиля
popupButtonCloseEditElement.addEventListener('click', function () {
  togglePopup(popupProfileEditElement);
});

//Обработчик отправки формы Профиля, закрытие по кнопке "Сохранить"
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupFormInputProfileNameElement.value;
  profileAboutElement.textContent = popupFormInputProfileAboutElement.value;
  togglePopup(popupProfileEditElement);
};

popupButtonCloseItemPhotoViewElement.addEventListener('click', function () {
  togglePopup(popupItemPhotoView);
});

//Добавление карточки, лайк, открытие модалки, удаление
function createCard(item) {
  const card = templateElement.cloneNode(true);
    card.querySelector('.elements__title').textContent = item.name;
    card.querySelector('.elements__photo').src = item.link;
    card.querySelector('.elements__photo').alt = item.name;
    card.querySelector('.elements__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active');
      });
    card.querySelector('.elements__photo').addEventListener('click', function () {
      popupItemPhotoViewName.src = item.link;
      popupItemPhotoViewName.alt = item.name;
      popupItemPhotoViewCaption.textContent = item.name;
      togglePopup(popupItemPhotoView);
      });
      card.querySelector('.elements__trash').addEventListener('click', function () {
        card.remove(item);
      });
  return card;
};

//Добавление первые 6 карточек из массива array-cards.js
function renderCards() {
  initialCards.forEach((item) => {
    cardsElement.append(createCard(item));
  });
};
renderCards();

//Открытие по кнопке модалки добавления карточки
popupButtonOpenAddItemElement.addEventListener('click', function () {
  togglePopup(popupItemCreateElement);
});

//Закрытие по кнопке модального окна "добавления карточки"
popupButtonCloseAddItemElement.addEventListener('click', function () {
  togglePopup(popupItemCreateElement);
});

//Добавление карточки через форму
function handleFormSubmitItem (evt) {
  evt.preventDefault();
  const titleCard = popupFormInputItemNameElement.value;
  const linkCard = popupFormInputItemUrlElement.value;
  const card = createCard({name: titleCard, link: linkCard});
  cardsElement.prepend(card);
  togglePopup(popupItemCreateElement);
  popupFormCreateItemElement.reset();
};

//Слушатели формы  "Карточки"
popupFormCreateItemElement.addEventListener('submit', handleFormSubmitItem);
//Слушатели формы  "Профиля"
popupFormEditElement.addEventListener('submit', handleFormSubmitProfile);
