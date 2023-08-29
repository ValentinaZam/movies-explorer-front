import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
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

function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

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
                            element={Profile}
                        />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/signin" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
