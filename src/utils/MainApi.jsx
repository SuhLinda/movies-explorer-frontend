class MainApi{
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkTheAnswer(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`ошибка:${response.status}`);
  }


  registration(name, email, password) {
    const urlId = `${this._url}/signup`;

    return fetch(urlId, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    })
      .then(this._checkTheAnswer);
  }

  login(email, password) {
    const urlId = `${this._url}/signin`;

    return fetch(urlId, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(this._checkTheAnswer);
  }

  logout() {
    const urlId = `${this._url}/signout`;

    return fetch(urlId, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkTheAnswer);
  }

  getUserMe() {
    const urlId = `${this._url}/users/me`;
    return fetch(urlId, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
  }

  updateProfile(name, email) {
    const urlId = `${this._url}/users/me`;

    return fetch(urlId, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, email})
    })
      .then(this._checkTheAnswer);
  }

  getSavedMovies() {
    const urlId = `${this._url}/movies`;

    return fetch(urlId, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
  }

  savedMovies(movie) {
    const urlId = `${this._url}/movies`;

    return fetch(urlId, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movie),
    })
  }

  deleteMovie(id) {
    const urlId = `${this._url}/movies/${id}`;

    return fetch(urlId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
  }
}

export const mainApi = new MainApi({
  url: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
