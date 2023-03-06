import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import initialCards from './data.js';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Профиль
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
//Модальные окна
const popupsElement = document.querySelectorAll('.popup');
const popupProfileEditElement = document.querySelector('.popup_edit');
const popupItemCreateElement = document.querySelector('.popup_item');
//Кнопки открытия Модальных окон
const popupButtonOpenEditElement = document.querySelector('.profile__button-edit');
const popupButtonOpenAddItemElement = document.querySelector('.profile__button-add-item');
//Объявление форм и полей "профиля"
const popupButtonSaveEditProfile = document.querySelector('.popup__button-save_edit');
const popupFormEditElement = document.querySelector('.popup__form_edit-profile');
const popupFormInputProfileNameElement = popupFormEditElement.querySelector('.popup__input_profile_name');
const popupFormInputProfileAboutElement = popupFormEditElement.querySelector('.popup__input_profile_about');
//Объявление формы и полей формы "карточки"
const popupFormCreateItemElement = popupItemCreateElement.querySelector('.popup__form_item-add')
const popupFormInputItemNameElement = popupFormCreateItemElement.querySelector('.popup__input_item_title');
const popupFormInputItemUrlElement = popupFormCreateItemElement.querySelector('.popup__input_item_url');
//Шаблон карточки
const cardsElement = document.querySelector('.elements__cards');
//создание валидаций для форм
const formValidatorProfile = new FormValidator(config, popupFormEditElement);
const formValidatorItem = new FormValidator(config, popupFormCreateItemElement);
formValidatorProfile.enableValidation();
formValidatorItem.enableValidation();

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
function openPopupForm() {
  popupFormInputProfileNameElement.value = profileNameElement.textContent;
  popupFormInputProfileAboutElement.value = profileAboutElement.textContent;
  popupButtonSaveEditProfile.removeAttribute('disabled', '');
  formValidatorProfile.resetErrors();
  openPopup(popupProfileEditElement);
};

//Обработчик отправки формы Профиля, закрытие по кнопке "Сохранить"
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupFormInputProfileNameElement.value;
  profileAboutElement.textContent = popupFormInputProfileAboutElement.value;
  closePopup(popupProfileEditElement);
};

//Открытие по кнопке модалки добавления карточки
function handlePopupButtonClick() {
  formValidatorItem.resetErrors();
  openPopup(popupItemCreateElement);
};

//Функция добавления из массива карточек
function renderCard(item, templateSelector) {
  const card = createCard(item, templateSelector);
  cardsElement.prepend(card);
};
//Функция cоздания карточки
function createCard(item, templateSelector) {
  const card = new Card(item, templateSelector, openPopup);
  const cardElement = card.generateCard();
  return cardElement;
};
//поиск карточек по запросу
initialCards.forEach((item) => {
  renderCard(item, '#card-template');
});

//Добавление карточек на страницу
function addCardToPage(name, link) {
  const cardData = { name, link };
  const card = createCard(cardData, '#card-template');
  cardsElement.prepend(card);
};

//Обработчик добавления карточки
function handleFormAddSubmitElement(evt) {
  evt.preventDefault();
  const name = popupFormInputItemNameElement.value;
  const link = popupFormInputItemUrlElement.value;
  addCardToPage(name, link);
  closePopup(popupItemCreateElement);
  popupFormCreateItemElement.reset();
};

//Слушатели форм
popupFormEditElement.addEventListener('submit', handleFormSubmitProfile);
popupButtonOpenAddItemElement.addEventListener('click', handlePopupButtonClick);
popupButtonOpenEditElement.addEventListener('click', openPopupForm);
popupFormCreateItemElement.addEventListener('submit', handleFormAddSubmitElement);
