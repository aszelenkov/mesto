import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  config,
  initialCards,
  containerSelector,
  templateSelector,
  photoViewSelector,
  popupProfileSelector,
  popupItemSelector,
  profileNameSelector,
  profileAboutSelector,
  editButtonProfile,
  addButtonCard,
} from '../utils/constants.js';
import './index.css';

// Информация о пользователе
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

// Создаём экземпляр класса для отображения увеличенной фотографии
const popupImage = new PopupWithImage(photoViewSelector);
popupImage.setEventListeners();

// Функция создания карточки
const createCard = (item) => new Card({
  data: item,
  handleCardClick: () => popupImage.open(item)
}, templateSelector).generateCard();

// Создаём экземпляр класса для списка карточек
const cardList = new Section(initialCards, createCard, containerSelector);
cardList.renderItems();

// Функция-обработчик сохранения изменений профиля
const profileFormSubmit = (infoData) => {
  userInfo.setUserInfo(infoData);
};

// Всплывающее окно с формой для профиля
const popupProfile = new PopupWithForm(popupProfileSelector, profileFormSubmit);
popupProfile.setEventListeners();

// Функция-обработчик нажатия на кнопку редактирования профиля
const editButtonClick = () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfile'].resetErrors();
  popupProfile.open();
};

// Функция-обработчик добавления новой карточки
const cardFormSubmit = (data) => {
  cardList.addItem(createCard({ name: data.title, link: data.url }));
};

// Всплывающее окно с формой для добавления карточки
const addPopupCard = new PopupWithForm(popupItemSelector, cardFormSubmit);
addPopupCard.setEventListeners();

// Функция-обработчик нажатия на кнопку добавления карточки
const addButtonClick = () => {
  formValidators['itemAdd'].resetErrors();
  addPopupCard.open();
};

// Функция инициализации валидации форм
const initializeValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  const formValidators = {};

  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    formValidators[form.getAttribute('name')] = validator;
    validator.enableValidation();
  });

  return formValidators;
};

// Инициализируем валидацию форм
const formValidators = initializeValidation(config);

// Добавляем слушатели на кнопки
addButtonCard.addEventListener('click',  addButtonClick);
editButtonProfile.addEventListener('click', editButtonClick);
