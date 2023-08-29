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
import * as auth from "../Auth/Auth"

function App() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState("");



    const handleLogin = (data) => {
        setLoggedIn(true)
        setEmail(data)
    }

    const handleRegistrationSubmit = (data) => {
        auth
            .register(data)
            .then(() => {
                navigate("/signin")
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }


    const handleLoginSubmit = (userInfo) => {
        auth
            .authorize(userInfo)
            .then(() => {
                setLoggedIn(true)
                handleLogin(userInfo.email)
                navigate("/", { replace: true })
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }
    useEffect(() => {
        const tokenUser = localStorage.getItem("token")
        if (tokenUser) {
            auth
                .checkToken(tokenUser)
                .then((user) => {

                    handleLogin(user.email)
                    navigate("/", { replace: true })
                })
                .catch((err) => console.log(`Ошибка: ${err}`))
        }
    }, [loggedIn])

    const signOut = () => {
        setLoggedIn(false)
        localStorage.removeItem("token")
        setEmail("")
        navigate("/")
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Routes>
                        <Route path="/" element={<Main loggedIn={loggedIn} />} />
                        <Route path="/movies" element={<ProtectedRoute
                            loggedIn={loggedIn}
                            element={Movies}
                        />} />
                        <Route path="/saved-movies" element={<ProtectedRoute
                            loggedIn={loggedIn}
                            element={SavedMovies}
                        />} />
                        <Route path="/profile" element={<ProtectedRoute
                            loggedIn={loggedIn}
                            signOut={signOut}
                            element={Profile}
                        />} />
                        <Route path="/signup" element={<Register onSubmit={handleRegistrationSubmit} />} />
                        <Route path="/signin" element={<Login onSubmit={handleLoginSubmit} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    {/* <Main loggedIn={loggedIn} /> */}
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
