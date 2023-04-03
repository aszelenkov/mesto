import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import {
  config,
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
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "53225a79-808c-4502-af98-76089dda326c",
    "Content-Type": "application/json",
  },
});

// Создаём экземпляр класса для отображения увеличенной фотографии
const popupImage = new PopupWithImage(popupViewSelector);
popupImage.setEventListeners();



// Информация о пользователе
const userInfo = new UserInfo(
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector
);
// Информация об ошибках с сервера
const handleError = (err) => console.log(`Ошибка: ${err}`);

// Выполняем запросы к серверу
Promise.all([api.getUserInfo(), api.getItems()])
  .then(([userInfoData, itemsData]) => {
    const { name, about, avatar, _id } = userInfoData;
    userInfo.setUserInfo({ name, about });
    userInfo.setAvatar(avatar);
    userInfo.setUserId(_id);

    cardList.renderItems(itemsData);
  })
  .catch(handleError);


//Создание карточки
const createCard = (data) => {
  const userId = userInfo.getUserId();
  const card = new Card(
    {
      data: data,
      userId: userId,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
      handleTrashClick: (cardId, removeCard) => {
        popupDeleteCard.open();
        popupDeleteCard.submitCallback(() => {
          popupDeleteCard.setSaveButtonText(true);
          api
            .deleteItem(cardId)
            .then(() => {
              removeCard();
              popupDeleteCard.close();
            })
            .catch(handleError)
            .finally(() => {
              popupDeleteCard.setSaveButtonText(false);
            });
        });
      },
      handleLikeClick: (
        cardId,
        isLiked,
        addLike,
        removeLike,
        setLikesCounter
      ) => {
        if (isLiked) {
          api
            .deleteLike(cardId)
            .then((data) => {
              setLikesCounter(data);
              removeLike();
            })
            .catch(handleError);
        } else {
          api
            .addLike(cardId)
            .then((data) => {
              setLikesCounter(data);
              addLike();
            })
            .catch(handleError);
        }
      },
    },
    templateSelector
  ).generateCard();
  return card;
};

// Создаём экземпляр класса для списка карточек
const cardList = new Section(createCard, containerSelector);

// Функция-обработчик сохранения изменений профиля
const profileFormSubmit = (infoData) => {
  popupProfile.setSaveButtonText(true);
  api
    .setUserInfo(infoData)
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, about: user.about });
      popupProfile.close();
    })
    .catch(handleError)
    .finally(() => {
      popupProfile.setSaveButtonText(false);
    });
};

// Всплывающее окно с формой для профиля
const popupProfile = new PopupWithForm(popupProfileSelector, profileFormSubmit);
popupProfile.setEventListeners();

// Функция-обработчик нажатия на кнопку редактирования профиля
const editButtonClick = () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  formValidators["editProfile"].resetErrors();
  popupProfile.open();
};

// Функция-обработчик добавления новой карточки
const addCardFormSubmit = (data) => {
  popupAddCard.setSaveButtonText(true);
  api
    .setItem({ name: data.title, link: data.url })
    .then((card) => {
      cardList.addItem(createCard(card));
      popupAddCard.close();
    })
    .catch(handleError)
    .finally(() => {
      popupAddCard.setSaveButtonText(false);
    });
};

// Всплывающее окно с формой для добавления карточки
const popupAddCard = new PopupWithForm(popupItemSelector, addCardFormSubmit);
popupAddCard.setEventListeners();

// Функция-обработчик нажатия на кнопку добавления карточки
const addButtonClick = () => {
  formValidators["itemAdd"].resetErrors();
  popupAddCard.open();
};

// Всплывающее окно с формой для удаления карточки
const popupDeleteCard = new PopupWithConfirmation(popupDeleteSelector);
popupDeleteCard.setEventListeners();


// Функция-обработчик отправки формы редактирования аватара
const avatarFormSubmit = ({ data }) => {
  popupAvatarEdit.setSaveButtonText(true);
  api
    .editAvatar(data)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      popupAvatarEdit.close();
    })
    .catch(handleError)
    .finally(() => {
      popupAvatarEdit.setSaveButtonText(false);
    });
};

// Всплывающее окно с формой для редактирования аватара
const popupAvatarEdit = new PopupWithForm(popupAvatarSelector, avatarFormSubmit);
popupAvatarEdit.setEventListeners();

// Функция инициализации валидации форм
const initializeValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  const formValidators = {};

  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    formValidators[form.getAttribute("name")] = validator;
    validator.enableValidation(config);
  });

  return formValidators;
};

// Инициализируем валидацию форм
const formValidators = initializeValidation(config);

// Добавляем слушатели на кнопки
addButtonCard.addEventListener("click", addButtonClick);
editButtonProfile.addEventListener("click", editButtonClick);
avatarBlock.addEventListener("click", () => {
  formValidators["avatarEdit"].resetErrors();
  popupAvatarEdit.open();
});
