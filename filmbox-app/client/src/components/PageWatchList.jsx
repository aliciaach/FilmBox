import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import { Dropdown, DropdownButton } from "react-bootstrap";

function PageWatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = 1; // TODO: replace with real logic

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/watchlist/${userId}`);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid response type");
        setWatchlist(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [userId]);

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
        <div className={error ? "text-danger" : "text-white"}>{error ? `Error: ${error}` : "Chargement du watchlist..."}</div>
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
          <a href="/" className="text-white text-decoration-none" style={{ marginTop: "-25px" }}>HOME</a>
          <a href="/PageWatchlist" className="text-white text-decoration-none" style={{ marginTop: "-25px" }}>MY MOVIES</a>
          <span className="text-white" style={{ marginTop: "-25px" }}>|</span>
          <DropdownButton
            id="profile-dropdown"
            align="end"
            title={<div className="d-flex align-items-center"><div className="bg-white rounded-circle me-2" style={{ width: 32, height: 32 }}></div><span className="text-white">Profil</span></div>}
            variant="transparent"
            style={{ border: "none" }}
          >
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </DropdownButton>
        </nav>
      </header>

      <div className="container">
        <h2 className="fw-bold mb-4">My Watchlist</h2>
        {watchlist.length > 0 ? (
          <div className="row">
            {watchlist.map((movie) => (
              <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
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
                    style={{ height: 450, width: 25, objectFit: "cover", borderRadius: 8 }}
                    onError={(e) => {
                      e.target.src = "  ";
                    }}
                  />
                  <div className="card-body px-0">
                    <h5 className="card-title fw-bold text-white">{movie.title}</h5>
                    <p className="card-text fw-bold text-white">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                      {movie.vote_average && (
                        <span className="float-end">⭐ {movie.vote_average.toFixed(1)}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="fs-5 mb-3">Your watchlist is empty</p>
            <button className="btn btn-primary px-4 py-2 fw-bold" style={{ backgroundColor: "#0352fc", border: "none" }} onClick={() => navigate("/")}>Browse Movies</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageWatchList;
