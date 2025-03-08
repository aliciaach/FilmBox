import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Style.css";
 
const FilmInfo = () => {
  const { filmId } = useParams();
 
  const [film, setFilm] = useState(null);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!filmId || isNaN(Number(filmId))) { //verifie si l'id est valide ou non
      setErreur("ID de film invalide.");
      return;
    }
 
    fetch(`http://localhost:4000/api/movies/${filmId}`) //requete api pour recuperer les details du films
      .then((response) => {
        if (!response.ok) {
          throw new Error("Film introuvable");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API reponse:", data);
        setFilm(data);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setErreur(err.message);
      });
  }, [filmId]);
 
  if (erreur) return <p className="text-danger text-center">{erreur}</p>;
  if (!film) return <p className="text-center">Chargement...</p>;
 
  let cheminImage = `/images/${film.titre.replace(/\s+/g, "_").toLowerCase()}.jpg`;
 
  //utilisation de chatgpt pour les classes BOOTSTRAP
  //ce bout de code genere dynamique les descriptions
  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Retour
      </button>
      <div className="card shadow p-4">
        <img
          src={cheminImage}
          alt={film.titre}
          className="card-img-top"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h2 className="card-title">{film.titre}</h2>
          <p><strong>Genre:</strong> {film.genre}</p>
          <p><strong>Durée:</strong> {film.film_duree} minutes</p>
          <p><strong>Date de sortie:</strong> {new Date(film.date_sortie).toLocaleDateString()}</p>
          <p><strong>Pays d'origine:</strong> {film.pays_origin_film}</p>
          <p><strong>Langue originale:</strong> {film.langue_original}</p>
          <p><strong>Directeur::</strong> {film.nom_directeur}</p>
        </div>
      </div>
    </div>
  );
};
 
export default FilmInfo;