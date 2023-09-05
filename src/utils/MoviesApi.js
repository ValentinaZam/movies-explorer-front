class MoviesApi {
    constructor({ url }) {
        this._url = url
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialMovies() {
        return fetch(this._url, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => this._checkResponse(res));
    }
}

export const moviesApi = new MoviesApi({
    // url: "https://api.project-mesto-deploy.nomoredomains.xyz",
    url: "https://api.nomoreparties.co/beatfilm-movies"
})