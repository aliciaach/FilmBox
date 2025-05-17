import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import Header from '../components/Header';
import { Dropdown, DropdownButton } from "react-bootstrap";
import ContainerManageList from './ContainerManageList';
import '../styles/PageWatchList.css'
import HeaderSpace from '../Functions/HeaderSpace.jsx';

function PageWatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [highestRated, setHighestRated] = useState([]);
  const [lowestRated, setLowestRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personalizedLists, setPersonalizedLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); //Faudra changer ça !!!


  const handleGestionList = (list) => {
    setSelectedList(list);  // On stocke l’objet complet
  };

  const handleCloseContainer = () => {
    setSelectedList(null);  // Pour fermer
  };

  const refreshLists = async () => {
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

      const cleanedWatchlist = watchlistData.filter(m => m.title && m.title !== "N/A"); //Filters out any movies from the watchlist that don’t have a valid title.
      const cleanedWatched = watchedData.filter(m => m.title && m.title !== "N/A");

      const watchedIds = cleanedWatched.map(m => m.id);//Extracts all movie IDs from the watched list (to know which ones have already been watched).
      const filteredWatchlist = cleanedWatchlist.filter(m => !watchedIds.includes(m.id)); //Keeps only the movies that are in the watchlist but not in the watched list (to avoid duplicates).

      setWatchlist(filteredWatchlist);
      setWatched(cleanedWatched);


      //https://www.w3schools.com/js/js_array_sort.asp
      const highestUnsorted = cleanedWatched.filter(m => m.valeur_note >= 3 && m.valeur_note <= 5);
      const lowestUnsorted = cleanedWatched.filter(m => m.valeur_note >= 0 && m.valeur_note <= 2);

      const highest = highestUnsorted.sort((a, b) => b.valeur_note - a.valeur_note);
      const lowest = lowestUnsorted.sort((a, b) => a.valeur_note - b.valeur_note);

      setHighestRated(highest);
      setLowestRated(lowest);
      setPersonalizedLists(personalizedData.data || []);

      if (selectedList) {
        const updatedList = (personalizedData.data || []).find(list => list._id === selectedList._id);
        if (updatedList) {
          setSelectedList(updatedList);
        }
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const SectionDivider = () => (
    <div style={{
      width: "100%",
      height: "2px",
      backgroundColor: "white",
      opacity: 0.3,
      margin: "10px 0"
    }} />
  );

  useEffect(() => {
    refreshLists();
  }, [userId]);

  const renderMovieRow = (movies) => (
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
              <h6 className="card-title text-white text-decoration-none" style={{ fontSize: "1rem", maxWidth: "200px" }}>{movie.title}</h6>
              <p className="card-text text-white text-decoration-none">
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
  );

  const backgroundStyle = {
    background: "linear-gradient(to bottom, #070042, #050032)",
    color: "#fff",
    padding: "20px",
    minHeight: "100vh",
  };

  const sectionBoxStyle = {
    //backgroundColor: "#121a49",
    borderRadius: "0px",
    padding: "20px",
    marginBottom: "40px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  };

  if (loading || error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={backgroundStyle}>
        <div className={error ? "text-danger" : "text-white"}>{error ? `Error: ${error}` : "Chargement..."}</div>
      </div>
    );
  }

  return (
    <>
      <div style={backgroundStyle}>
        <HeaderSpace />

        <Header />

        <div style={{
          backgroundColor: "#050032",
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
          color: "white",
          textAlign: "center",
          padding: "40px 20px",
        }}>
          <h1>Seen it? Rate it!</h1>
          <p style={{
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            Don’t forget to leave your opinion on the movies you watch.
            Every story deserves a final word. Will it be 5 stars or 0? The ending is yours to decide!
          </p>
        </div>

        <div className="container">

          <div className="text-white" style={sectionBoxStyle} >
            <h2 className="text-white" style={{ marginBottom: "10px" }}>My Watchlist</h2>
            <SectionDivider />
            {watchlist.length > 0 ? renderMovieRow(watchlist) : <p>Your watchlist is empty.</p>}
          
          </div>

          <div style={sectionBoxStyle}>
            <h2 className="text-white text-decoration-none mb-4">My Watched Movies</h2>
            <SectionDivider />
            {watched.length > 0 ? renderMovieRow(watched) : <p>No movies marked as watched yet.</p>}
          </div>

          <div style={sectionBoxStyle}>
            <h2 className="text-white text-decoration-none mb-4">My Highest Rated Movies(3-5 ⭐)</h2>
            <SectionDivider />
            {highestRated.length > 0 ? renderMovieRow(highestRated) : <p>No high rated movies yet.</p>}
          </div>

          <div style={sectionBoxStyle}>
            <h2 className="text-white text-decoration-none mb-4">My Lowest Rated Movies (0-2 ⭐)</h2>
            <SectionDivider />
            {lowestRated.length > 0 ? renderMovieRow(lowestRated) : <p>No low rated movies yet.</p>}
          </div>


          {/* Render personalized lists only if there are any movies */}


          {personalizedLists.length > 0 && personalizedLists.map((list) => (
            <div key={list._id} style={sectionBoxStyle}>
              <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <h2 className="fw-bold mt-0">{list.name}</h2>
                <button className="btn btn-primary" style={{
                  backgroundColor: "transparent",
                  backgroundRepeat: "no-repeat",
                  border: "none",
                  cursor: "pointer",
                  overflow: "hidden"
                }} onClick={() => handleGestionList(list)} >Manage List</button>
              </div>
              <SectionDivider />
              {list.movies && list.movies.length > 0 ? renderMovieRow(list.movies) : <p>No movies in this list yet.</p>}
            </div>
          ))}

          {selectedList && ( //Si une liste est selectionnée, on affiche le container 
            <ContainerManageList list={selectedList} onClose={handleCloseContainer} onUpdate={refreshLists} />
          )}

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

        {/*Cette partie est entierement creer par CHATGPT pour le style du scrollbar */}
        <style>{`
        .movie-slider::-webkit-scrollbar {
          height: 8px;
        }

        .movie-slider::-webkit-scrollbar-track {
          background: #1c1c3c;
          border-radius: 4px;
        }

        .movie-slider::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }

        .movie-slider::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
     `}</style>
      </div>
    </>
  );
}

export default PageWatchList;