import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlackImage from '../assets/BlackImage.png';

function SearchResults() {
  const { searchQuery } = useParams(); //This will give what is currently in the search bar from the URL -- NOT SURE IF ITS SAFE CHECK WITH TEACHER 
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setResults([]);
      return;
    }

    fetch(`/api/getMoviesResults/${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        console.error("Error while fetching search results:", err);
      });
  }, [searchQuery]);

  return (
    <>
      <div style={{
        padding: "40px",
        background: "rgb(5, 14, 66)",
        color: "white",
        minHeight: "100vh"
      }}>
        <Header />

        <h1>Search Results for "{searchQuery}"</h1>

        <div className="row mt-3">
          {results.map((film, index) => {
            let cheminImage = film.poster_path
              ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
              : BlackImage;

            return (
              <div key={film.id || index} className="col-lg-2 col-md-3 col-sm-6 mb-4">
                <div className="card border-0 shadow movie-card" 
                  style={{
                    borderRadius: "0px",
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                    backgroundColor: "transparent"
                  }}>
                  <Link to={`/movies/${film.id}`} className="text-decoration-none">
                    <img
                      src={cheminImage}
                      alt={film.title}
                      className="card-img-top"
                      style={{ 
                        objectFit: "cover",
                        transition: 'all 0.3s ease',
                        borderRadius: "0px"
                      }}
                      onError={(e) => { e.target.src = BlackImage; }}
                    />
                    {/* Optional title */}
                    {/* <div className="card-body text-center">
                      <h6 className="card-title text-white">{film.title}</h6>
                    </div> */}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* styles personnalisés pour l'effet de survol */}
        <style>{`
          .movie-card:hover {
            border: 2px solid #4a6bff !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 20px rgba(74, 107, 255, 0.3) !important;
          }
          .movie-card:hover img {
            opacity: 0.9;
          }
        `}</style>
      </div>
    </>
  );
}

export default SearchResults;
