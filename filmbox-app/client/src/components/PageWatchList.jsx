import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import { Dropdown, DropdownButton } from "react-bootstrap";

function PageWatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [highestRated, setHighestRated] = useState([]);
  const [lowestRated, setLowestRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personalizedLists, setPersonalizedLists] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [watchlistRes, watchedRes, personalizedRes] = await Promise.all([
          fetch(`http://localhost:4000/api/watchlist/${userId}`),
          fetch(`http://localhost:4000/api/watched/${userId}`),
          fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${userId}`)
        ]);

        if (!watchlistRes.ok || !watchedRes.ok) throw new Error("Failed to fetch watchlist or watched movies");

        const watchlistData = await watchlistRes.json();
        const watchedData = await watchedRes.json();
        const personalizedData = await personalizedRes.json();

        // Supprimer les films avec titre "N/A"
        const cleanedWatchlist = watchlistData.filter(m => m.title && m.title !== "N/A");
        const cleanedWatched = watchedData.filter(m => m.title && m.title !== "N/A");

        // Exclure de la watchlist ceux déjà marqués comme vus
        const watchedIds = cleanedWatched.map(m => m.id);
        const filteredWatchlist = cleanedWatchlist.filter(m => !watchedIds.includes(m.id));

        setWatchlist(filteredWatchlist);
        setWatched(cleanedWatched);

        const highest = cleanedWatched.filter(m => m.rating >= 3 && m.rating <= 5);
        const lowest = cleanedWatched.filter(m => m.rating >= 0 && m.rating <= 2);

        setHighestRated(highest);
        setLowestRated(lowest);
        setPersonalizedLists(personalizedData.data || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const renderMovieRow = (movies) => (
    <div style={{ display: "flex", overflowX: "auto", gap: "1rem", paddingBottom: "1rem" }}>
      {movies.map((movie) => (
        <div key={movie.id} style={{ minWidth: 200, flex: "0 0 auto" }}>
          <div
            className="card bg-transparent border-0 h-100"
            style={{ cursor: "pointer", transition: "transform 0.3s" }}
            onClick={() => navigate(`/movies/${movie.id}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"}
              alt={movie.title}
              className="card-img-top"
              style={{ height: 300, width: 200, objectFit: "cover", borderRadius: 8 }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/500x750?text=No+Poster"; }}
            />
            <div className="card-body px-0">
              <h6 className="card-title text-white text-decoration-none" style={{ fontSize: "1rem" }}>{movie.title}</h6>
              <p className="card-text text-white text-decoration-none">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                {movie.vote_average && (
                  <span className="float-end">⭐ {movie.vote_average.toFixed(1)}</span>
                )}
              </p>
              {movie.rating && (
                <div className="text-warning small">Your rating: {movie.rating} ⭐</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const backgroundStyle = {
    background: "linear-gradient(to bottom, #070042, #050032)",
    color: "#fff",
    fontFamily: "Fredoka",
    padding: "20px",
    minHeight: "100vh",
  };

  if (loading || error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={backgroundStyle}>
        <div className={error ? "text-danger" : "text-white"}>{error ? `Error: ${error}` : "Chargement..."}</div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <header className="d-flex justify-content-between align-items-center px-4 mb-4">
        <img
          src={imageLogo}
          alt="Logo"
          style={{ width: 150, cursor: "pointer" }}
          onClick={() => navigate("/listeFilms")}
        />
        <nav className="d-flex align-items-center gap-4">
          <a href="/" className="text-white text-decoration-none">HOME</a>
          <a href="/PageWatchlist" className="text-white text-decoration-none">MY MOVIES</a>
          <span className="text-white">|</span>
          <DropdownButton id="profile-dropdown" align="end" title={<span className="text-white">Profil</span>} variant="transparent">
            <Dropdown.Item href="/userSettings">Settings</Dropdown.Item>
            <Dropdown.Item href="/connexion">Logout</Dropdown.Item>
          </DropdownButton>
        </nav>
      </header>

      <div className="container">
        <h2 className="text-white text-decoration-none mb-4">My Watchlist</h2>
        {watchlist.length > 0 ? renderMovieRow(watchlist) : <p>Your watchlist is empty.</p>}

        <h2 className="text-white text-decoration-none mt-5 mb-4">Watched Movies</h2>
        {watched.length > 0 ? renderMovieRow(watched) : <p>No movies marked as watched yet.</p>}

        <h2 className="text-white text-decoration-none mt-5 mb-4">Highest Rated (3-5 ⭐)</h2>
        {highestRated.length > 0 ? renderMovieRow(highestRated) : <p>No high rated movies yet.</p>}

        <h2 className="text-white text-decoration-none mt-5 mb-4">Lowest Rated (0-2 ⭐)</h2>
        {lowestRated.length > 0 ? renderMovieRow(lowestRated) : <p>No low rated movies yet.</p>}

        {personalizedLists.length > 0 && personalizedLists.map((list) => (
          <div key={list._id}>
            <h2 className="fw-bold mt-5 mb-4">{list.name}</h2>
            {list.movies && list.movies.length > 0 ? renderMovieRow(list.movies) : <p>No movies in this list yet.</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageWatchList;
