import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BodyAccueil from './components/BodyAccueil';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import ListeFilms from './components/PageFilm';
import FilmInfo from './components/FilmInfo';
import UserSettings from './components/UserSettings';
import AdminLogin from "./components/adminLogin"
import AdminManagement from './components/adminManagement';
import UserManagement from './components/UserManagement';


export default function App() {
  return (
  
    /*
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BodyAccueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/listeFilms" element={<ListeFilms/>} />
        <Route path="/movies/:filmId" element={<FilmInfo />} />
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/userManagement" element={<UserManagement />} />        
      </Routes>
    </BrowserRouter>*/
    
    //<UserSettings />
    //<AdminLogin />
    <UserManagement />
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

