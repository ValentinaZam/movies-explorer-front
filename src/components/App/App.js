import React from "react"
import { Routes, Route } from "react-router-dom"
import Main from "../Main/Main"
import NotFound from "../NotFound/NotFound"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import "./App.css"

function App() {

    return (
        <div className="body">
            <div className="page">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/saved-movies" element={<SavedMovies />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

            </div>
        </div>
    );
}

export default App;
