export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameUser = document.querySelector(nameSelector);
    this._aboutUser = document.querySelector(infoSelector);
  };

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent
    };
  };

  setUserInfo({ name, about }) {
    this._nameUser.textContent = name;
    this._aboutUser.textContent = about;
  };
};

