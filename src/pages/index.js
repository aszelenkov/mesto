import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  config,
  initialCards,
  containerSelector,
  templateSelector,
  popupViewSelector,
  popupProfileSelector,
  popupItemSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  editButtonProfile,
  avatarBlock,
  addButtonCard,
} from '../utils/constants.js';
import './index.css';

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
//   headers: {
//     authorization: '53225a79-808c-4502-af98-76089dda326c',
//     'Content-Type': 'application/json'
//   }
// });



// Информация о пользователе
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector);

// Создаём экземпляр класса для отображения увеличенной фотографии
const popupImage = new PopupWithImage(popupViewSelector);
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
const popupAddCard = new PopupWithForm(popupItemSelector, cardFormSubmit);
popupAddCard.setEventListeners();

// Функция-обработчик нажатия на кнопку добавления карточки
const addButtonClick = () => {
  formValidators['itemAdd'].resetErrors();
  popupAddCard.open();
};

const popupDeleteCard = new PopupWithForm(popupDeleteSelector);
popupDeleteCard.setEventListeners();


// const avatarFormSubmit = ({data}) => {

// }

const popupAvatarEdit = new PopupWithForm(popupAvatarSelector);
popupAvatarEdit.setEventListeners();

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
avatarBlock.addEventListener('click', () => {
  // formValidators['editAvatar'].resetErrors();
  popupAvatarEdit.open();

})
