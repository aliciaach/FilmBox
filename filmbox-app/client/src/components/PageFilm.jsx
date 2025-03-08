import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Style.css"; 

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/movies") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="container text-center mt-4">
      <h2 className="text-white bg-primary p-3 rounded">Les films</h2>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row mt-3">
          {movies.map((movie, index) => {
            //genere dynamiquement les images du path selon le titre du film
            let imagePath = `/images/${movie.titre.replace(/\s+/g, "_").toLowerCase()}.jpg`;

            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow">
                  {}
                  <div className="card-img-container" style={{ aspectRatio: "2/3" }}>
                    <img
                      src={imagePath}
                      alt={movie.titre}
                      className="card-img-top"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{movie.titre}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovieList;