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
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #050A30 0%, #0A1F50 50%, #162269 100%)",
        color: "white",
      }}
    >
      <div className="container">
      <button
        className="btn btn-outline-light position-absolute top-0 start-0 m-4"
        onClick={() => navigate(-1)}
      >
      Retour
      </button>

        <div className="card border-0 shadow-lg overflow-hidden" style={{ 
          background: "rgba(28, 28, 28, 0.8)",
        }}>
          <div className="row g-0">
            {/* Movie Poster Column */}
            <div className="col-md-5">
              <div className="position-relative h-100">
                <img
                  src={cheminImage}
                  alt={film.titre}
                  className="img-fluid h-100 w-100"
                  style={{ 
                    objectFit: "cover",
                    minHeight: "600px"
                  }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3" 
                  style={{ 
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                  }}>
                </div>
              </div>
            </div>
            
            {/* Movie Info Column */}
            <div className="col-md-7">
              <div className="p-4 p-lg-5 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4">
                    <h1 className="fw-bold mb-3" style={{ 
                      fontSize: "2.5rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#FFFFFF" //FFFFFFF = blanc
                    }}>
                      {film.titre}
                    </h1>
                    
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="badge bg-primary px-3 py-2" style={{ color: "#FFFFFF" }}>
                        {film.genre}
                      </span> 
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="mb-3" style={{ color: "#4a6bff" }}>Détails du film:</h3>
                    <div className="row" style={{ color: "#FFFFFF" }}>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Durée:</strong></p>
                        <p>{film.film_duree} minutes</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Date de sortie:</strong></p>
                        <p>{new Date(film.date_sortie).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Réalisateur:</strong></p>
                        <p>{film.nom_directeur}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Langue originale:</strong></p>
                        <p>{film.langue_original}</p>
                      </div>

                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Pays origine:</strong></p>
                        <p>{film.pays_origin_film}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;