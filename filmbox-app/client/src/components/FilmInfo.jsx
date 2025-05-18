import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Dropdown, DropdownButton } from "react-bootstrap";

const FilmInfo = () => {
  const { filmId } = useParams();
  const navigate = useNavigate();
  const numericFilmId = Number(filmId);

  const [user, setUser] = useState({});
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const [film, setFilm] = useState(null);
  const [movieLogo, setMovieLogo] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [markedWatched, setMarkedWatched] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [personalizedLists, setPersonalizedLists] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Charger la session utilisateur
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-session", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setErreur("Session non trouvée");
        }
      } catch (err) {
        console.error("Erreur session:", err);
        setErreur("Erreur de session");
      } finally {
        setSessionLoaded(true);
      }
    };

    fetchUserSession();
  }, []);

  // 2. Charger les données du film une fois la session chargée
  useEffect(() => {
    if (!filmId || isNaN(numericFilmId) || !sessionLoaded || !user.utilisateur_id) return;

    const fetchData = async () => {
      try {
        const filmRes = await fetch(`http://localhost:4000/api/movies/${numericFilmId}`);
        const filmData = await filmRes.json();
        setFilm(filmData);

        const imageRes = await fetch(`http://localhost:4000/api/movies/${numericFilmId}/images`);
        const imageData = await imageRes.json();
        const englishLogo = imageData.logos?.find(logo => logo.iso_639_1 === 'en');
        setMovieLogo(englishLogo || null);

        const watchlistRes = await fetch(`http://localhost:4000/api/watchlist/${user.utilisateur_id}`);
        const watchlistData = await watchlistRes.json();
        setIsInWatchlist(watchlistData.some(movie => movie.id === numericFilmId));

        const watchedRes = await fetch(`http://localhost:4000/api/watched/${user.utilisateur_id}`);
        const watchedData = await watchedRes.json();
        const watched = watchedData.find(movie =>
          movie.id === numericFilmId || movie.films_film_id === numericFilmId
        );

        if (watched) {
          setMarkedWatched(true);
          if (watched.valeur_note !== undefined && watched.valeur_note !== null) {
            setRating(watched.valeur_note);
          }
          if (watched.commentaire) {
            setComment(watched.commentaire);
          }
        }

        const favRes = await fetch(`http://localhost:4000/api/favorites/${user.utilisateur_id}`);
        const favData = await favRes.json();
        setIsFavorite(favData.some(movie => movie.id === numericFilmId));

        const personalRes = await fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${user.utilisateur_id}`);
        const personalData = await personalRes.json();
        setPersonalizedLists(personalData.data || []);
      } catch (err) {
        console.error("Erreur chargement des données:", err);
      }
    };

    fetchData();
  }, [filmId, numericFilmId, sessionLoaded, user]);

  const handleWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await fetch(`http://localhost:4000/api/watchlist/${user.utilisateur_id}/${numericFilmId}`, {
          method: "DELETE",
        });
        setIsInWatchlist(false);
      } else {
        await fetch("http://localhost:4000/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.utilisateur_id, movieId: numericFilmId }),
        });
        setIsInWatchlist(true);
      }
    } catch (err) {
      console.error("Erreur watchlist:", err);
    }
  };

  const handleWatched = async () => {
    try {
      if (markedWatched) {
        await fetch(`http://localhost:4000/api/watched/${user.utilisateur_id}/${numericFilmId}`, {
          method: "DELETE",
        });
        setMarkedWatched(false);
        setComment("");
      } else {
        await fetch("http://localhost:4000/api/watched", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.utilisateur_id,
            movieId: numericFilmId,
          }),
        });
        setMarkedWatched(true);
      }

      if (isInWatchlist) {
        await fetch(`http://localhost:4000/api/watchlist/${user.utilisateur_id}/${numericFilmId}`, {
          method: "DELETE",
        });
        setIsInWatchlist(false);
      }
    } catch (err) {
      console.error("Erreur statut 'vu':", err);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await fetch("http://localhost:4000/api/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.utilisateur_id,
          movieId: numericFilmId,
          rating: rating,
          comment,
        }),
      });

      setSuccessMsg("Rating added!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Erreur rating:", err);
    }
  };

  const handleAddToList = async (listId) => {
    try {
      await fetch("http://localhost:4000/mongo/addToPersonalizedList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.utilisateur_id, personalizedListId: listId, filmId: numericFilmId }),
      });
      alert("Movie added to list!");
    } catch (error) {
      console.error("Error adding film to list:", error);
      alert("Error");
    }
  };

  const handleAddNewPersonalizedList = async () => {
    const listName = prompt("Enter a name for your new list:");
    if (!listName) return;

    try {
      const response = await fetch("http://localhost:4000/mongo/createPersonalizedList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.utilisateur_id, listName }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedRes = await fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${user.utilisateur_id}`);
        const updatedData = await updatedRes.json();
        if (updatedData.data) {
          setPersonalizedLists(updatedData.data);
        }
        alert("List created!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Server error");
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch(`http://localhost:4000/api/favorites/${user.utilisateur_id}/${numericFilmId}`, {
          method: "DELETE",
        });
        setIsFavorite(false);
      } else {
        await fetch("http://localhost:4000/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.utilisateur_id, movieId: numericFilmId }),
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (erreur) return <p className="text-danger text-center">{erreur}</p>;
  if (!film) return <p className="text-center text-white">Chargement...</p>;

  const cheminImage = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
  const genres = film.genres?.map(g => g.name).join(", ");
  const countries = film.production_countries?.map(c => c.name).join(", ");

  return (
    <div className="min-vh-100" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(7, 0, 66, 0.5), rgba(5, 0, 50, 0.7)), url(${cheminImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#fff",
      fontFamily: "Fredoka",
    }}>
      <Header />

      <div className="container py-5 text-start" style={{ maxWidth: "800px", marginLeft: "0", paddingLeft: "2rem" }}>
        <div style={{ marginBottom: 20, marginTop: "70px" }}>
          {movieLogo ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movieLogo.file_path}`}
              alt="Movie Logo"
              style={{ maxHeight: 100 }}
            />
          ) : (
            <h2 style={{ fontWeight: "bold" }}>{film.title}</h2>
          )}
        </div>

        <p>{new Date(film.release_date).getFullYear()} • {film.runtime} min • {genres}</p>
        <p>{film.overview}</p>
        <p><strong>Langue:</strong> {film.original_language}</p>
        <p><strong>Pays:</strong> {countries}</p>

        <div className="d-flex align-items-center gap-3 mt-4">
          <button className="btn btn-light" onClick={handleWatched}>
            {markedWatched ? "Unmark Watched" : "Mark As Watched"}
          </button>

          {!markedWatched && (
            <button className="btn btn-outline-light" onClick={handleWatchlist}>
              {isInWatchlist ? "In Watchlist" : "Add To Watchlist"}
            </button>
          )}

          <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`} onClick={toggleFavorite}>
            ♥ {isFavorite ? "In Favorites" : "Add to Favorites"}
          </button>

          <DropdownButton id="list-dropdown" title="Add To List">
            {personalizedLists.length === 0 && (
              <Dropdown.Item disabled>No Lists Available</Dropdown.Item>
            )}
            {personalizedLists.map((list) => (
              <Dropdown.Item key={list._id} onClick={() => handleAddToList(list._id)}>
                {list.name}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleAddNewPersonalizedList}>
              Create New List
            </Dropdown.Item>
          </DropdownButton>
        </div>

        {markedWatched && (
          <div className="mt-4">
            <label className="form-label">Rate this movie:</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "2rem",
                    color: (hoverRating || rating) >= star ? "#FFD700" : "#CCCCCC",
                    cursor: "pointer",
                  }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="mt-3">
              <label htmlFor="comment" className="form-label">Comment:</label>
              <textarea
                id="comment"
                className="form-control"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ maxWidth: "500px" }}
              />
            </div>

            <button className="btn btn-primary mt-3" onClick={handleRatingSubmit}>
              Submit Rating
            </button>

            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmInfo;