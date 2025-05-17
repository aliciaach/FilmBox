import React from 'react';
import { useNavigate } from 'react-router-dom';

function SlidingMovie({ title, movies }) {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: "#121a49",
      borderRadius: "0px",
      padding: "20px",
      marginBottom: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    }}>
      <h2 className="text-white text-decoration-none mb-4">{title}</h2>
      <div style={{
        width: "100%",
        height: "2px",
        backgroundColor: "white",
        opacity: 0.3,
        margin: "10px 0"
      }} />

      {movies.length > 0 ? (
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: "1rem",
            paddingBottom: "1rem",
            scrollBehavior: "smooth"
          }}
          className="movie-slider"
        >
          {movies.map((movie) => (
            <div key={movie.id} style={{ minWidth: 200, flex: "0 0 auto", scrollSnapAlign: "start" }}>
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
                  style={{ height: 300, width: 200, objectFit: "cover", borderRadius: 0 }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/500x750?text=No+Poster"; }}
                />
                <div className="card-body px-0">
                  <h6 className="card-title text-white" style={{ fontSize: "1rem", maxWidth: "200px" }}>{movie.title}</h6>
                  <p className="card-text text-white">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                    {movie.vote_average && (
                      <span className="float-end">⭐ {movie.vote_average.toFixed(1)}</span>
                    )}
                  </p>
                  {movie.valeur_note && (
                    <div className="text-warning small">Your rating: {movie.valeur_note} ⭐</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No movies in this section.</p>
      )}
    </div>
  );
}

export default SlidingMovie;
