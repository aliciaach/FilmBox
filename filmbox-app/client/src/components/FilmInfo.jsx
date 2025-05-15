import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Dropdown, DropdownButton } from "react-bootstrap";

const FilmInfo = () => {
  const { filmId } = useParams();
  const navigate = useNavigate();
  const numericFilmId = Number(filmId);
  const userId = localStorage.getItem("userId");

  const [film, setFilm] = useState(null);
  const [movieLogo, setMovieLogo] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [markedWatched, setMarkedWatched] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [personalizedLists, setPersonalizedLists] = useState([]);

  useEffect(() => {
    if (!filmId || isNaN(numericFilmId)) {
      setErreur("ID de film invalide.");
      return;
    }

    const fetchData = async () => {
      try {
        const filmRes = await fetch(`http://localhost:4000/api/movies/${numericFilmId}`);
        const filmData = await filmRes.json();
        setFilm(filmData);

        const imageRes = await fetch(`http://localhost:4000/api/movies/${numericFilmId}/images`);
        const imageData = await imageRes.json();
        setMovieLogo(imageData.logos?.[0]);

        const watchlistRes = await fetch(`http://localhost:4000/api/watchlist/${userId}`);
        const watchlistData = await watchlistRes.json();
        setIsInWatchlist(watchlistData.some(movie => movie.id === numericFilmId));

        const watchedRes = await fetch(`http://localhost:4000/api/watched/${userId}`);
        const watchedData = await watchedRes.json();
        const watched = watchedData.find(movie => movie.id === numericFilmId);
        if (watched) {
          setMarkedWatched(true);
          setRating(watched.rating);
          if (watched.commentaire) setComment(watched.commentaire);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
      }
    };

    fetchData();

    fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setPersonalizedLists(data.data);
        } else {
          console.warn("No personalized lists found");
        }
      })
      .catch((err) => console.error("Error fetching personalized lists:", err));
  }, [filmId, numericFilmId, userId]);

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
    } catch (err) {
      console.error("Erreur lors de la modification de la watchlist:", err);
    }
  };

  const handleWatched = async () => {
    try {
      if (markedWatched) {
        await fetch(`http://localhost:4000/api/watched/${userId}/${numericFilmId}`, {
          method: "DELETE",
        });
        setMarkedWatched(false);
        setComment("");
      } else {
         await fetch("http://localhost:4000/api/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          movieId: numericFilmId,
        }),
      });
        setMarkedWatched(true);
      }
    } catch (err) {
      console.error("Erreur lors du changement de statut 'vu':", err);
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
          comment,
        }),
      });
      alert("Note enregistrée !");
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la note:", err);
    }
  };

  const handleAddToList = async (listId) => {
    try {
      const response = await fetch("http://localhost:4000/mongo/addToPersonalizedList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, personalizedListId: listId, filmId: numericFilmId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Movie added to list!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding film to list:", error);
      alert("Server error while adding film to list");
    }
  };

  const handleAddNewPersonalizedList = async () => {
    const listName = prompt("Enter a name for your new list:");
    if (!listName) return;

    try {
      const response = await fetch("http://localhost:4000/mongo/createPersonalizedList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, listName }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("List created!");

        //Fetch again to refresh
        const updatedRes = await fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${userId}`);
        const updatedData = await updatedRes.json();
        if (updatedData.data) {
          setPersonalizedLists(updatedData.data);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Server error while creating list");
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
        {movieLogo && (
          <img
            src={`https://image.tmdb.org/t/p/original${movieLogo.file_path}`}
            alt="Movie Logo"
            style={{ maxHeight: 100, marginBottom: 20, marginTop: "70px" }}
          />
        )}

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
                <spa n
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
                </spa>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmInfo;
