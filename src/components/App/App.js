import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import NotFound from "../NotFound/NotFound"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import "./App.css"

function App() {
    const location = useLocation()

    const shouldShowHeader = () => {
        const { pathname } = location
        return (
            pathname === "/" ||
            pathname === "/movies" ||
            pathname === "/saved-movies" ||
            pathname === "/profile"
        )
    }


    const shouldShowFooter = () => {
        const { pathname } = location
        return pathname === "/"
    }

    return (
        <div className="body">
            <div className="page">
                {shouldShowHeader() && <Header />}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/saved-movies" element={<SavedMovies />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {shouldShowFooter() && <Footer />}
            </div>
        </div>
    );
}

export default App;
