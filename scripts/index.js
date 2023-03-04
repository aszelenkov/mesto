import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

//Профиль
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
//Модальные окна
const popupsElement = document.querySelectorAll('.popup');
// const openedPopup = document.querySelector('.popup_opened');
const popupProfileEditElement = document.querySelector('.popup_edit');
const popupItemCreateElement = document.querySelector('.popup_item');
export const popupItemPhotoView = document.querySelector('.popup_item_photo-view');
//Кнопки открытия Модальных окон
const popupButtonOpenEditElement = document.querySelector('.profile__button-edit');
const popupButtonOpenAddItemElement = document.querySelector('.profile__button-add-item');

//Объявление форм и полей "профиля"
const popupForms = Array.from(document.querySelectorAll('.popup__form')); // массив объектов форм
const popupFormEditElement = popupProfileEditElement.querySelector('.popup__form_edit-profile');
const popupFormInputProfileNameElement = popupFormEditElement.querySelector('.popup__input_profile_name');
const popupFormInputProfileAboutElement = popupFormEditElement.querySelector('.popup__input_profile_about');
//Объявление формы и полей формы "карточки"
const popupFormCreateItemElement = popupItemCreateElement.querySelector('.popup__form_item-add')
const popupFormInputItemNameElement = popupFormCreateItemElement.querySelector('.popup__input_item_title');
const popupFormInputItemUrlElement = popupFormCreateItemElement.querySelector('.popup__input_item_url');
//Шаблон карточки
const cardsElement = document.querySelector('.elements__cards');
//Popup PhotoView
export const popupItemPhotoViewName = popupItemPhotoView.querySelector('.popup__photo');
export const popupItemPhotoViewCaption = popupItemPhotoView.querySelector('.popup__photo-caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функция открытия модальных окон
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalEscape);
};

//Функция закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalEscape);
};

//закрытие модальных окон по оверлею и кнопке закрытия
popupsElement.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    };
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    };
  });
});

//закрытие по клавише ESC
function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

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

//Открытие по кнопке модалки добавления карточки
popupButtonOpenAddItemElement.addEventListener('click', () => {
  openPopup(popupItemCreateElement);
});

//Функция отображения ошибок
function resetErrors() {
  const popupInput = Array.from(document.querySelectorAll('.popup__input'));
  const errorInput = Array.from(document.querySelectorAll('.popup__error'));
  errorInput.forEach((errorElement) =>
    (errorElement.textContent = ''));
  popupInput.forEach((inputElement) => {
    (inputElement.classList.remove('.popup__input_type_error'));
  });
};

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();
  cardsElement.append(cardElement);
});

popupFormCreateItemElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = popupFormInputItemNameElement.value;
  const link = popupFormInputItemUrlElement.value;
  const card = new Card({ name, link }, '#card-template');
  cardsElement.prepend(card.generateCard());
  closePopup(popupItemCreateElement);
  popupFormCreateItemElement.reset();
});

popupForms.forEach(formElement => {
  const formValidator = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  },formElement);
  formValidator.enableValidation();
});

//Слушатели формы  "Профиля"
popupFormEditElement.addEventListener('submit', handleFormSubmitProfile);

