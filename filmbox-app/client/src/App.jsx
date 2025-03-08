import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BodyAccueil from './components/BodyAccueil';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import ListeFilms from './components/PageFilm';
import FilmInfo from './components/FilmInfo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BodyAccueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/listeFilms" element={<ListeFilms/>} />
        <Route path="/movies/:filmId" element={<FilmInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);