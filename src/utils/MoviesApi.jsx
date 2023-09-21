class MoviesApi{
  constructor(url) {
    this._url = url;
  }

  _checkTheAnswer(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`ошибка:${response.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        this._checkTheAnswer(response);
      })
  }
}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies')
