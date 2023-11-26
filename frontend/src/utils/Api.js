class Api {
  constructor(config) {
    this._url = config.url;
  }

  #onResponce(res) {
    return res.ok
      ? res.json()
      : res.json().then((errData) => Promise.reject(errData));
  }

  dataProfile(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.#onResponce);
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt")
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this.#onResponce);
  }

  addCard(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.#onResponce);
  }

  editingProfile(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.#onResponce);
  }

  avatarProfile(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.#onResponce);
  }

  removeCard(idCard) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this.#onResponce);
  }

  addLike(idCard) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this.#onResponce);
  }

  delLike(idCard) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this.#onResponce);
  }
}

const configApi = {
  url: 'https://api.mesto-web.nomoredomainsmonster.ru',
  //url: "http://localhost:3000",
};

const api = new Api(configApi);
export default api;
