export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getItems() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => this._checkResponse(res));
  };

  setItem({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  };

  deleteItem(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  };

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  };

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar}),
    }).then((res) => this._checkResponse(res));
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((res) => this._checkResponse(res));
  };

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => this._checkResponse(res));
  };

};

