import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import BlackImage from '../assets/BlackImage.png';

const NOMBRE_DUPLICATION = 5; // Nombre de fois que les films seront dupliqués
 
const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des films");
        }
        return response.json();
      })
      .then((donnees) => {
        const filmsDuppliques = Array.from({ length: NOMBRE_DUPLICATION }, () => donnees).flat();
        setFilms(filmsDuppliques);
      })
      .catch((erreur) => setErreur(erreur.message));
  }, []);

  return (
    <div className="min-vh-100" 
        style={{
               background: `linear-gradient(to bottom,
                    rgba(5, 14, 66, 1),
                    rgba(26, 0, 255, 0.6),
                    rgba(0, 0, 255, 0.5),
                    rgba(5, 0, 50, 1)),
                    url(${BlackImage})`,
           
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          color: '#fff'
        }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark">
        <Link to="/" className="navbar-brand">
          <img src={imageLogo} alt="Logo" height="150" />
        </Link>
        <div>
          <Link to="/" className="text-decoration-none text-white mx-3 fw-bold">Accueil</Link>
          <Link to="/usersettings" className="text-decoration-none text-white mx-3 fw-bold">Paramètres user</Link>
          <Link to="/listeFilms" className="text-decoration-none text-primary mx-3 fw-bold">Mes films</Link>
          <Link to="/connexion" className="text-decoration-none text-white mx-3 fw-bold">Déconnexion</Link>
        </div>
      </nav>

      {/* Movie List Section */}
      <div className="container text-center mt-0">
        <h1 className="text-white display-3 fw-bold">Vu ce film ? Notez-le !</h1>
        <p className="text-white">
          N'oubliez pas de donner votre avis sur les films que vous regardez.
          <br />
          Chaque histoire mérite un dernier mot. Ce sera 5 étoiles ou 0 ?
          <br />
          C'est à vous de décider !
        </p>

        {/* Filtres déroulants */}
        <div className="mb-4 text-start">
          <button 
            className="btn btn-primary dropdown-toggle"
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded="false"
          >
            Filtrer les films
          </button>
          
          {showFilters && (
            <div className="bg-dark p-3 mt-2 rounded" style={{ width: '300px' }}>
              <div className="mb-3">
                <label className="form-label text-white">Genre</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Tous les genres</option>
                  <option value="action">Action</option>
                  <option value="comedie">Comédie</option>
                  <option value="drame">Drame</option>
                  <option value="horreur">Horreur</option>
                  <option value="science-fiction">Science-fiction</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Décennie</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Toutes les décennies</option>
                  <option value="2020">Années 2020</option>
                  <option value="2010">Années 2010</option>
                  <option value="2000">Années 2000</option>
                  <option value="1990">Années 1990</option>
                  <option value="1980">Années 1980</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Pays d'origine</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Tous les pays</option>
                  <option value="usa">États-Unis</option>
                  <option value="uk">Royaume-Uni</option>
                  <option value="france">France</option>
                  <option value="japon">Japon</option>
                  <option value="coree-du-sud">Corée du Sud</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Langue originale</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Toutes les langues</option>
                  <option value="anglais">Anglais</option>
                  <option value="francais">Français</option>
                  <option value="japonais">Japonais</option>
                  <option value="espagnol">Espagnol</option>
                  <option value="coreen">Coréen</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Durée</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Toutes les durées</option>
                  <option value="court">Moins de 90 min</option>
                  <option value="moyen">90-120 min</option>
                  <option value="long">Plus de 120 min</option>
                </select>
              </div>
              
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-light">Reset</button>
                <button className="btn btn-primary">Appliquer les filtres</button>
              </div>
            </div>
          )}
        </div>

        {erreur ? (
          <p className="text-danger">{erreur}</p>
        ) : (
          <div className="row mt-3">
            {films.map((film, index) => {
              let cheminImage = `/images/${film.titre.replace(/\s+/g, "_").toLowerCase()}.jpg`;

              return (
                <div key={film.film_id || index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="card bg-dark border-0 shadow movie-card" 
                    style={{
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)'
                    }}>
                    <Link to={`/movies/${film.film_id}`} className="text-decoration-none">
                      <img
                        src={cheminImage}
                        alt={film.titre}
                        className="card-img-top rounded"
                        style={{ 
                          height: "480px", 
                          objectFit: "cover",
                          transition: 'all 0.3s ease'
                        }}
                      />
                      <div className="card-body text-center">
                        <h6 className="card-title text-white">{film.titre}</h6>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* styles personnalisés pour l'effet de survol */}
      <style>{`
        .movie-card:hover {
          border: 2px solid #4a6bff !important;
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 20px rgba(74, 107, 255, 0.3) !important;
        }
        .movie-card:hover img {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default ListeFilms;