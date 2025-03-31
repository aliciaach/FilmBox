import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactDOM from "react-dom/client";
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

export default function App() {
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
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/AdminManagementPage" element={<AdminManagementPage />} />
      </Routes>
    </BrowserRouter>
    //<UserSettings />
    //<AdminLogin />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
