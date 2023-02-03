//Профиль
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
//Карточка название и ссылка на картинку
const itemNameElement = document.querySelector('.elements__title');
const itemPhotoUrlElement = document.querySelector('.elements__photo');
//Модальные окна
const popupElement = document.querySelectorAll('.popup');
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
