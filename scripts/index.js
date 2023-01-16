const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const profileButtonEditElement = document.querySelector('.profile__button-edit');
const popupElement = document.querySelector('.popup');
const popupButtonCloseElement = popupElement.querySelector('.popup__button-close');
const popupFormElement = popupElement.querySelector('.popup__form');
const popupFormInputNameElement = popupElement.querySelector('.popup__input_text_name');
const popupFormInputAboutElement = popupElement.querySelector('.popup__input_text_about');

//Открытие модального окна с подставлением данных из профиля
const openPopup = function() {
  popupElement.classList.add('popup_opened');
  popupFormInputNameElement.value = profileNameElement.textContent;
  popupFormInputAboutElement.value = profileAboutElement.textContent;
};

profileButtonEditElement.addEventListener('click', openPopup);

//Закрытие модального окна по кнопке "Close"
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupButtonCloseElement.addEventListener('click', closePopup);

//Обработчик отправки формы, закрытие по кнопке "Сохранить"
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupFormInputNameElement.value;
  profileAboutElement.textContent = popupFormInputAboutElement.value;
  closePopup();
};

popupFormElement.addEventListener('submit', handleFormSubmit);
