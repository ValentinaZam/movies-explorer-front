import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Main from "../Main/Main"
import NotFound from "../NotFound/NotFound"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import "./App.css"
import { CurrentUserContext } from "../Context/CurrentUserContext"
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute"
import * as auth from "../../utils/Auth"
import { mainApi } from "../../utils/MainApi"

function App() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorGlobal, setErrorGlobal] = useState("");
    const [savedMovies, setSavedMovies] = useState([]);
    const location = useLocation();

    function resetErrorGlobal() {
        setErrorGlobal("");
    }

    useEffect(() => {
        if (loggedIn) {
            mainApi
                .getUserInfo()
                .then((email) => setCurrentUser(email))
                .catch((err) => console.log(`Ошибка ${err}`))
        }
    }, [loggedIn])

    function handleUpdateUser(data) {
        mainApi
            .setUserInfo(data)
            .then((userInfo) => {
                setCurrentUser(userInfo)

            })
            .catch((err) => console.log(`Ошибка ${err}`))
    }

    const handleLoginSubmit = (userInfo) => {
        auth
            .authorize(userInfo)
            .then(() => {
                setLoggedIn(true)
                navigate("/movies", { replace: true })
            })
            .catch((err) => {
                setErrorGlobal(err.message)
            })
    }

    const handleRegistrationSubmit = (data) => {
        auth
            .register(data)
            .then((info) => {
                handleLoginSubmit({ email: data.email, password: data.password })
                setCurrentUser(info)
            })
            .catch((err) => {
                setErrorGlobal(err.message)
            })
    }

    useEffect(() => {
        const tokenUser = localStorage.getItem("token")
        if (tokenUser) {
            auth
                .checkToken(tokenUser)
                .then(() => {
                    setLoggedIn(true)
                    navigate(location.pathname, { replace: true });
                })
                .catch((err) => console.log(`Ошибка: ${err}`))
        }
    }, [loggedIn, errorGlobal])

    const signOut = () => {
        setLoggedIn(false)
        localStorage.clear();
        navigate("/")
    }

    const filterShortMovies = (movies) => {
        const filteredMovies = [];

        for (const movie of movies) {
            if (movie.duration <= 40) {
                filteredMovies.push(movie);
            }
        }
        return filteredMovies;
    };

    const filterMoviesByName = (movies, text) => {
        const lowercaseText = text.toLowerCase();

        return movies.reduce((filteredMovies, movie) => {
            const { nameRU, nameEN } = movie;

            if (
                nameRU.toLowerCase().includes(lowercaseText) ||
                nameEN.toLowerCase().includes(lowercaseText)
            ) {
                filteredMovies.push(movie);
            }

            return filteredMovies;
        }, []);
    };

    useEffect(() => {
        if (loggedIn) {
            mainApi.getInitialSavedMovies()
                .then((myMovies) => {
                    setSavedMovies(myMovies);
                    setLoggedIn(true);
                })
                .catch((err) => console.log(`Ошибка: ${err}`))

        }

    }, [loggedIn])

    const handleSaveMovie = (movie) => {
        mainApi
            .addSaveMovie(movie)
            .then((myMovie) => {
                setSavedMovies([...savedMovies, myMovie])
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
    }

    const handleDeleteMovie = (movieId) => {
        mainApi
            .deleteMovie(movieId)
            .then(({ _id: deleteMovieId }) => {
                const newSavedMovies = savedMovies.filter(
                    ({ _id }) => _id !== deleteMovieId
                );
                setSavedMovies(newSavedMovies);
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Routes>
                        <Route path="/" element={<Main loggedIn={loggedIn} />} />
                        <Route path="/movies" element={<ProtectedRoute
                            loggedIn={loggedIn}
                            filterMoviesByName={filterMoviesByName}
                            filterShortMovies={filterShortMovies}
                            element={Movies}
                            savedMovies={savedMovies}
                            onSaveMovies={handleSaveMovie}
                            onDeleteMovie={handleDeleteMovie}
                        />} />
                        <Route path="/saved-movies" element={<ProtectedRoute
                            loggedIn={loggedIn}
                            filterMoviesByName={filterMoviesByName}
                            element={SavedMovies}
                            savedMovies={savedMovies}
                            onDeleteMovie={handleDeleteMovie}
                            filterShortMovies={filterShortMovies}
                        />} />
                        <Route path="/profile" element={<ProtectedRoute
                            onSubmit={handleUpdateUser}
                            loggedIn={loggedIn}
                            signOut={signOut}
                            element={Profile}
                        />} />
                        <Route path="/signup" element={<Register onSubmit={handleRegistrationSubmit} errorGlobal={errorGlobal} resetErrorGlobal={resetErrorGlobal} />} />
                        <Route path="/signin" element={<Login onSubmit={handleLoginSubmit} errorGlobal={errorGlobal} resetErrorGlobal={resetErrorGlobal} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
