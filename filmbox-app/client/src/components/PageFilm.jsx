import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";


const NOMBRE_DUPLICATION = 5;

const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [erreur, setErreur] = useState(null);

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
    <div
      className="min-vh-100"
      style={{ background: "linear-gradient(180deg, #050A30, #0A1F50, #162269)", color: "white" }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-dark px-4">
        <Link to="/" className="navbar-brand">
          <img src={imageLogo} alt="Logo" height="150" />
        </Link>
        <div>
          <Link to="/" className="text-decoration-none text-white mx-3 fw-bold">HOME</Link>
          <Link to="/usersettings" className="text-decoration-none text-white mx-3 fw-bold">USER SETTINGS</Link>
          <Link to="/listeFilms" className="text-decoration-none text-primary mx-3 fw-bold">MY MOVIES</Link>
          <Link to="/connexion" className="text-decoration-none text-white mx-3 fw-bold">LOGOUT</Link>
        </div>
      </nav>

      {/* Movie List Section */}
      <div className="container text-center mt-0">
        <h1 className="text-white display-3 fw-bold">Seen It? Rate It!</h1>
        <p className="text-white">
          Don't forget to leave your opinion on the movies you watch.
          <br />
          Every story deserves a final word. Will it be 5 stars or 0?
          <br />
          The ending is yours to decide!
        </p>

        {erreur ? (
          <p className="text-danger">{erreur}</p>
        ) : (
          <div className="row mt-3">
            {films.map((film, index) => {
              let cheminImage = `/images/${film.titre.replace(/\s+/g, "_").toLowerCase()}.jpg`;

              return (
                <div key={film.film_id || index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="card bg-dark border-0 shadow">
                    <Link to={`/movies/${film.film_id}`}>
                      <img
                        src={cheminImage}
                        alt={film.titre}
                        className="card-img-top rounded"
                        style={{ height: "480px", objectFit: "cover" }}
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
    </div>
  );
};

export default ListeFilms;
