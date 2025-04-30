import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
//import SearchResults from './components/SearchResults';
//import BrowseMovies from './components/BrowseMoviePage';
// import UserManagement from "./components/UserManagement";
 
function App() {
  return (/*
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<BodyAccueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/listeFilms" element={<ListeFilms />} />
        <Route path="/movies/:filmId" element={<FilmInfo />} />
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/AdminManagementPage" element={<AdminManagementPage />} />
        <Route path="/PageWatchlist" element={<PageWatchList />} />
        <Route path="/SearchResults/:searchQuery" element={<SearchResults/>} />
        <Route path="/BrowseMovies" element={<BrowseMovies/>} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>*/

    //<UserSettings />
    //<AdminLogin />
    <UserManagement />
    //<Connexion/>
  );
}
 
export default App;
 
 