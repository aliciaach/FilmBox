import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BodyAccueil from "./components/BodyAccueil";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import ListeFilms from "./components/PageFilm";
import FilmInfo from "./components/FilmInfo";
import UserSettings from "./components/UserSettings";
import AdminLogin from "./components/adminLogin";
import AdminManagement from "./components/AdminManagement";
import UserManagement from "./components/UserManagement";
import PageWatchList from "./components/PageWatchList";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import BrowseMovies from "./components/BrowseMoviePage";

function App() {
  useEffect(() => {
    const handleUnload = (event) => {
      const rememberMe = localStorage.getItem("rememberMe");

      //Aide de chatgpt pour la ligne fonction suivante
      const navType = performance.getEntriesByType("navigation")[0]?.type;
      const isReload = navType === "reload" || navType === "navigate";

      if (rememberMe !== "true" && !isReload) {
        navigator.sendBeacon("http://localhost:4000/destroy-session");
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
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
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/AdminManagement" element={<AdminManagement />} />
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
