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
import PageWatchList from "./components/PageWatchList";
// import UserManagement from "./components/UserManagement"; 

function App() {
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
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/AdminManagementPage" element={<AdminManagementPage />} />
        <Route path="/PageWatchlist" element={<PageWatchList />} />
      </Routes>
<<<<<<< HEAD
    </BrowserRouter>
=======
    </BrowserRouter>*/
    
    //<UserSettings />
    //<AdminLogin />
    <UserManagement />
>>>>>>> 8d19093a9aae8f157dd36048428a8c8dbc46b003
  );
}

export default App;
