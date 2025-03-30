import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BlackImage from '../assets/BlackImage.png';

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

    fetch(`http://localhost:4000/api/movies/${filmId}`)//this is my parameter 
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

  let cheminImage = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

  return (
    <div className="min-vh-100 py-5" 
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
      <div className="container position-relative">
        {/* Back Button - Now integrated into the header area */}
        <button
          className="btn btn-outline-light mb-4 d-flex align-items-center"
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(28, 28, 28, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '8px 16px',
            transition: 'all 0.3s ease',
            width: 'fit-content'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(74, 107, 255, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(74, 107, 255, 0.8)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(28, 28, 28, 0.6)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          {/* ce bout de code import une fleche et shape la fleche a l'aide de chatgpt */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
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
                  alt={film.title}
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
                      color: "#FFFFFF"
                    }}>
                      {film.title}
                    </h1>
                    
                    
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="mb-3" style={{ color: "#4a6bff" }}>Détails du film:</h3>
                    <div className="row" style={{ color: "#FFFFFF" }}>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Durée:</strong></p>
                        <p>{film.runtime} minutes</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Date de sortie:</strong></p>
                        <p>{new Date(film.release_date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Réalisateur:</strong></p>
                        <p>{film.nom_directeur}</p> {/*not working for now, need to find where to get the info*/}
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Langue originale:</strong></p>
                        <p>{film.original_language}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Pays origine:</strong></p>
                        {/*have to fix this, sometimes same country multiple times!! */}
                        <p>{film.production_companies.map(c => c.origin_country).join(", ")}</p> 
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <p className="mb-1"><strong>Genre:</strong></p>
                        <p>{film.genres.map(g => g.name).join(", ")}</p>
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