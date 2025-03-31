import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WickedImage from "../assets/wicked.jpg";
import { Dropdown, DropdownButton } from "react-bootstrap";

const FilmInfo = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [imageLogo, setImageLogo] = useState(null);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filmId || isNaN(Number(filmId))) {
      setErreur("ID de film invalide.");
      return;
    }

    fetch(`http://localhost:4000/api/movies/${filmId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Film introuvable");
        return res.json();
      })
      .then((data) => {
        setFilm(data);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setErreur(err.message);
      });
  }, [filmId]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/movies/${filmId}/images`)
      .then((res) => {
        if (!res.ok) throw new Error("Images introuvables");
        return res.json();
      })
      .then((data) => {
        setImageLogo(data.logos[0]);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setErreur(err.message);
      });
  }, [filmId]);

  if (erreur) return <p className="text-danger text-center">{erreur}</p>;
  if (!film) return <p className="text-center text-white">Chargement...</p>;

  const cheminImage = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
  const filmTitle = film.title;
  const genres = film.genres?.map((g) => g.name).join(", ");
  const countries = film.production_companies?.map((c) => c.origin_country).join(", ");

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(7, 0, 66, 0.7), rgba(5, 0, 50, 0.7)), url(${cheminImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        fontFamily: "Fredoka",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>logo here !!</div>
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a href="/" style={{ textDecoration: "none", color: "#fff" }}>HOME</a>
          <a href="/movies" style={{ textDecoration: "none", color: "#fff" }}>MY MOVIES</a>
          <span>|</span>
          <DropdownButton
            id="dropdown-basic-button"
            align="end"
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#fff", marginRight: 8 }}></div>
                <span style={{ color: "#fff" }}>Profil</span>
              </div>
            }
            variant="transparent"
            style={{ background: "transparent", border: "none" }}
          >
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </DropdownButton>
        </nav>
      </header>

      <div className="container py-5 text-start">
        <h3 className="mb-4">{filmTitle}</h3>

        {imageLogo && (
          <img
            src={`https://image.tmdb.org/t/p/original${imageLogo.file_path}`}
            alt="Movie logo"
            style={{ maxWidth: "300px", marginBottom: "20px" }}
          />
        )}

        <div className="row">
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
  );
};

export default FilmInfo;
