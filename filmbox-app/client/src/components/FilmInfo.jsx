import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WickedImage from "../assets/wicked.jpg"; // fallback image
import { Dropdown, DropdownButton } from "react-bootstrap";

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

  const cheminImage = film.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${film.backdrop_path}`
    : WickedImage;

  const genres = film.genres?.map((g) => g.name).join(", ");
  const countries = film.production_companies?.map((c) => c.origin_country).join(", ");

  return (
    <div
    //not sure this div is truly useful lol
      className="min-vh-100"
      style={{
            background: `linear-gradient(to bottom, rgba(7, 0, 66, 1),rgba(5, 0, 50, 1))`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            color: '#fff',
            fontFamily: "Fredoka",
          }}>
      <div className="text-center mt-0">
      <div className="min-vh-100" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(7, 0, 66, 0.7), rgba(5, 0, 50, 0.7)), url(${cheminImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight:"100vh",
        color: "#fff",
        fontFamily: "Fredoka",
      }}>
        <header
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "rgba(116, 101, 247, 0)",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>logo here !!</div>
          <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="/" style={{ textDecoration: "none", color: "#fff", fontSize: "18px" }}>
              HOME
            </a>
            <a href="/movies" style={{ textDecoration: "none", color: "#fff", fontSize: "18px" }}>
              MY MOVIES
            </a>
            <span style={{ fontSize: "18px" }}>|</span>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <DropdownButton
                id="dropdown-basic-button"
                align="end"
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        marginRight: "8px",
                      }}
                    ></div>
                    <span style={{ fontSize: "18px", color: "#fff" }}>Profil</span>
                  </div>
                }
                variant="transparent"
                style={{
                  background: "transparent",
                  border: "none",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
              </DropdownButton>
            </div>
          </nav>
        </header>
      </div>
      
      
        

        <div className="container py-5 text-start">
          <h3 className="mb-4" style={{ color: "#4a6bff" }}>Détails du film :</h3>
          <div className="row" style={{ color: "#FFFFFF" }}>
            <div className="col-md-6 mb-3">
              <p className="mb-1"><strong>Durée:</strong></p>
              <p>{film.runtime} minutes</p>
            </div>
            <div className="col-md-6 mb-3">
              <p className="mb-1"><strong>Date de sortie:</strong></p>
              <p>{new Date(film.release_date).toLocaleDateString("fr-FR")}</p>
            </div>
            <div className="col-md-6 mb-3">
              <p className="mb-1"><strong>Réalisateur:</strong></p>
              <p>(non disponible)</p>
            </div>
            <div className="col-md-6 mb-3">
              <p className="mb-1"><strong>Langue originale:</strong></p>
              <p>{film.original_language}</p>
            </div>
            <div className="col-md-6 mb-3">
              <p className="mb-1"><strong>Pays d'origine:</strong></p>
              <p>{countries}</p>
            </div>
            <div className="col-md-6 mb-3">
              <p className="mb-1"><strong>Genre:</strong></p>
              <p>{genres}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
