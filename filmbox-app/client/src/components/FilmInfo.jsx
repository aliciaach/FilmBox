import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FilmInfo = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filmId || isNaN(Number(filmId))) {
      setErreur("ID de film invalide.");
      return;
    }

    fetch(`http://localhost:4000/api/movies/${filmId}`)
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
  if (!film) return <p className="text-center text-white">Chargement...</p>;

  let cheminImage = `/images/${film.titre.replace(/\s+/g, "_").toLowerCase()}.jpg`;

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        background: "linear-gradient(180deg, #050A30, #0A1F50, #162269)",
        color: "white",
      }}
    >
      <button
        className="btn btn-outline-light position-absolute top-0 start-0 m-4"
        onClick={() => navigate(-1)}
      >
      Retour
      </button>

      <div className="card text-white shadow-lg border-0 mt-5" style={{ width: "60%", background: "#1C1C1C" }}>
        <img
          src={cheminImage}
          alt={film.titre}
          className="card-img-top rounded-top"
          style={{ height: "600px", width: "400px", objectFit: "cover" }}
        />
        <div className="card-body p-5 ">
          <h1 className="card-title text-center fw-bold mb-4" style={{ textTransform: "uppercase" }}>
            {film.titre}
          </h1>
          <div className="d-flex flex-column gap-3">
            <p className="fs-5">
              <strong className="text-primary">Genre:</strong> {film.genre}
            </p>
            <p className="fs-5">
              <strong className="text-primary">Durée:</strong> {film.film_duree} minutes
            </p>
            <p className="fs-5">
              <strong className="text-primary">Date de sortie:</strong>{" "}
              {new Date(film.date_sortie).toLocaleDateString()}
            </p>
            <p className="fs-5">
              <strong className="text-primary">Pays d'origine:</strong> {film.pays_origin_film}
            </p>
            <p className="fs-5">
              <strong className="text-primary">Langue originale:</strong> {film.langue_original}
            </p>
            <p className="fs-5">
              <strong className="text-primary">Directeur:</strong> {film.nom_directeur}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;