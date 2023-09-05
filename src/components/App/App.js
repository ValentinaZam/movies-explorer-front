import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
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
    // const [email, setEmail] = useState("");
    const [errorGlobal, setErrorGlobal] = useState(true);

    // const handleLogin = (data) => {
    //     setLoggedIn(true)
    //     setEmail(data)
    // }

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
                // handleLogin(userInfo.email)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
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
                setErrorGlobal(false)
                console.log(`Ошибка: ${err}`)
            })
    }


    useEffect(() => {
        const tokenUser = localStorage.getItem("token")
        if (tokenUser) {
            auth
                .checkToken(tokenUser)
                .then((user) => {
                    // handleLogin(user.email)
                    navigate("/movies", { replace: true })
                    console.log(loggedIn)
                    // setLoggedIn(true)
                })
                .catch((err) => console.log(`Ошибка: ${err}`))
        }
    }, [loggedIn, errorGlobal])

    const signOut = () => {
        setLoggedIn(false)
        localStorage.clear();
        // localStorage.removeItem("token")
        // localStorage.removeItem("allMovies")
        // localStorage.removeItem("filteredMovies")
        // setEmail("")
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

    const filterMoviesByName = (movies, request) => {
        const lowercaseRequest = request.toLowerCase();

        return movies.reduce((filteredMovies, movie) => {
            const { nameRU, nameEN } = movie;

            if (
                nameRU.toLowerCase().includes(lowercaseRequest) ||
                nameEN.toLowerCase().includes(lowercaseRequest)
            ) {
                filteredMovies.push(movie);
            }

            return filteredMovies;
        }, []);
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
                        />} />
                        <Route path="/saved-movies" element={<ProtectedRoute
                            loggedIn={loggedIn}
                            element={SavedMovies}
                        />} />
                        <Route path="/profile" element={<ProtectedRoute
                            onSubmit={handleUpdateUser}
                            loggedIn={loggedIn}
                            signOut={signOut}
                            element={Profile}
                        />} />
                        <Route path="/signup" element={<Register onSubmit={handleRegistrationSubmit} errorGlobal={errorGlobal} />} />
                        <Route path="/signin" element={<Login onSubmit={handleLoginSubmit} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
