export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._nameUser = document.querySelector(nameSelector);
    this._aboutUser = document.querySelector(infoSelector);
    this._avatarUser = document.querySelector(avatarSelector);
    this._userId = '';
  };

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
      userId: this._userId
    };
  };

  setUserInfo({ name, about, _id }) {
    this._nameUser.textContent = name;
    this._aboutUser.textContent = about;
  };

  setAvatar(url) {
    this._avatarUser.src = url;
  }

  getUserId() {
    return this._userId;
  }

  setUserId(_id) {
    this._userId = _id;
  }
};

