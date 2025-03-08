import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Style.css"; 
 
const NOMBRE_DUPLICATION = 5; // Nombre de fois que les films seront dupliqués
 
const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [erreur, setErreur] = useState(null);
 
  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Probleme dans le chargement des films");
        }
        return response.json();
      })
      .then((donnees) => {
        //permet de dupliquer dynamiquement les films en fonction du nombre donnee
        const filmsDuppliques = Array.from({ length: NOMBRE_DUPLICATION }, () => donnees).flat();
        setFilms(filmsDuppliques);
      })
      .catch((erreur) => setErreur(erreur.message));
  }, []);
 
  //utilisation de chatgpt pour les classes BOOTSTRAP
  //affichage dynamique des films
  return (
    <div className="container text-center mt-4">
      <h2 className="text-white bg-primary p-3 rounded">Liste des Films</h2>
      {erreur ? (
        <p className="text-danger">{erreur}</p>
      ) : (
        <div className="row mt-3">
          {films.map((film, index) => {
            //genere dynamiquement le chemin de l'image en fonction du titre du film
            let cheminImage = `/images/${film.titre.replace(/\s+/g, "_").toLowerCase()}.jpg`;
 
            return (
              <div key={film.film_id || index} className="col-md-4 mb-4">
                <div className="card shadow">
                  <Link to={`/movies/${film.film_id}`}>
                    <div className="card-img-container" style={{ aspectRatio: "2/3" }}>
                      <img
                        src={cheminImage}
                        alt={film.titre}
                        className="card-img-top"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{film.titre}</h5>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
 
export default ListeFilms;