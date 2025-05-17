import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BodyAccueil from "./components/BodyAccueil";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import ListeFilms from "./components/PageFilm";
import FilmInfo from "./components/FilmInfo";
import UserSettings from "./components/UserSettings";
import AdminLogin from "./components/AdminLogin";
import AdminManagement from "./components/adminManagement";
import AdminManagementPage from "./components/AdminManagementPage";
import UserManagement from "./components/UserManagement";
import PageWatchList from "./components/PageWatchList";
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import BrowseMovies from './components/BrowseMoviePage';

function App() {
  
  useEffect(() => {


    //https://developer.mozilla.org/fr/docs/Web/API/Navigator/sendBeacon and help of chatgpt for the event listeners
     const handleBeforeClosingPage = () => {
      
      const rememberMe = localStorage.getItem("rememberMe"); //check if the user wants to be remembered
      if (rememberMe !== "true") {
        navigator.sendBeacon("http://localhost:4000/destroy-session"); //if no, we destroy the current session
      }
    };

    window.addEventListener("beforeunload", handleBeforeClosingPage);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeClosingPage);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BodyAccueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/listeFilms" element={<ListeFilms />} />
        <Route path="/movies/:filmId" element={<FilmInfo />} />
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/AdminManagementPage" element={<AdminManagementPage />} />
        <Route path="/PageWatchlist" element={<PageWatchList />} />
        <Route path="/SearchResults/:searchQuery" element={<SearchResults />} />
        <Route path="/BrowseMovies" element={<BrowseMovies />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;