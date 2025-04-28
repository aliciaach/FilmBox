import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import imageLogo from "../assets/logo_FilmBox.png";

const FilmInfo = () => {
  const { filmId } = useParams();
  const numericFilmId = Number(filmId);
  const [film, setFilm] = useState(null);
  const [movieLogo, setMovieLogo] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [markedWatched, setMarkedWatched] = useState(false);
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();
  const userId = 1; // TEMPORARY USER ID

  useEffect(() => {
    if (!filmId || isNaN(numericFilmId)) {
      setErreur("ID de film invalide.");
      return;
    }

    fetch(`http://localhost:4000/api/movies/${numericFilmId}`)
      .then((res) => res.json())
      .then(setFilm)
      .catch((err) => setErreur(err.message));

    fetch(`http://localhost:4000/api/movies/${numericFilmId}/images`)
      .then((res) => res.json())
      .then((data) => setMovieLogo(data.logos?.[0]))
      .catch((err) => setErreur(err.message));

    fetch(`http://localhost:4000/api/watchlist/${userId}`)
      .then((res) => res.json())
      .then((watchlist) => {
        setIsInWatchlist(watchlist.some((movie) => movie.id === numericFilmId));
      });

    fetch(`http://localhost:4000/api/watched/${userId}`)
      .then(res => res.json())
      .then(data => {
        const watched = data.find(movie => movie.id === numericFilmId);
        if (watched) {
          setMarkedWatched(true);
          setRating(watched.rating);
        }
      });
  }, [filmId]);

  const handleWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await fetch(`http://localhost:4000/api/watchlist/${userId}/${numericFilmId}`, {
          method: "DELETE",
        });
        setIsInWatchlist(false);
      } else {
        await fetch("http://localhost:4000/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, movieId: numericFilmId }),
        });
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWatched = async () => {
    if (markedWatched) {
      // User is unmarking it — remove rating from DB
      try {
        await fetch(`http://localhost:4000/api/watched/${userId}/${numericFilmId}`, {
          method: "DELETE",
        });
        setMarkedWatched(false);
      } catch (err) {
        console.error("Failed to remove from watched:", err);
      }
    } else {
      // Just toggle on visually — rating is saved only on submit
      setMarkedWatched(true);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await fetch("http://localhost:4000/api/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          movieId: numericFilmId,
          rating,
          comment: "",
        }),
      });
      alert("Rating saved!");
    } catch (err) {
      console.error("Error saving rating:", err);
    }
  };

  if (erreur) return <p className="text-danger text-center">{erreur}</p>;
  if (!film) return <p className="text-center text-white">Chargement...</p>;

  const cheminImage = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
  const genres = film.genres?.map((g) => g.name).join(", ");
  const countries = film.production_countries?.map((c) => c.name).join(", ");

  return (
    <div className="min-vh-100" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(7, 0, 66, 0.5), rgba(5, 0, 50, 0.7)), url(${cheminImage})`,
      backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
      color: "#fff", fontFamily: "Fredoka",
    }}>
      <header className="d-flex justify-content-between align-items-center p-3">
        <img src={imageLogo} alt="Logo" style={{ width: "150px" }} />
        <nav className="d-flex align-items-center gap-3">
          <a href="/" className="text-white text-decoration-none">HOME</a>
          <a href="/PageWatchlist" className="text-white text-decoration-none">MY MOVIES</a>
          <DropdownButton id="profile-dropdown" align="end" title={<span className="text-white">Profil</span>} variant="transparent">
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </DropdownButton>
        </nav>
      </header>

      <div className="container py-5 text-start" style={{ maxWidth: "800px" }}>
        {movieLogo && <img src={`https://image.tmdb.org/t/p/original${movieLogo.file_path}`} alt="Logo" style={{ maxHeight: 100, marginBottom: 20 }} />}
        <p>{new Date(film.release_date).getFullYear()} • {film.runtime} min • {genres}</p>
        <p>{film.overview}</p>
        <p><strong>Langue:</strong> {film.original_language}</p>
        <p><strong>Pays:</strong> {countries}</p>

        <div className="d-flex align-items-center gap-3 mt-4">
          <button className="btn btn-light" onClick={handleWatched}>
            {markedWatched ? "Unmark Watched" : "Mark as Watched"}
          </button>
          <button className="btn btn-outline-light" onClick={handleWatchlist}>
            {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
          </button>
        </div>

        {markedWatched && (
          <div className="mt-3">
            <label htmlFor="rating" className="form-label">Rate this movie:</label>
            <select
              id="rating"
              className="form-select"
              style={{ maxWidth: "120px" }}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r} ⭐</option>)}
            </select>
            <button className="btn btn-primary mt-2" onClick={handleRatingSubmit}>Submit Rating</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmInfo;
