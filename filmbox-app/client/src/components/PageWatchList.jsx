import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BlackImage from '../assets/BlackImage.png';
import Header from '../components/Header';
import ContainerManageList from './ContainerManageList';
import '../styles/PageWatchList.css';
import HeaderSpace from '../Functions/HeaderSpace.jsx';

function PageWatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [highestRated, setHighestRated] = useState([]);
  const [lowestRated, setLowestRated] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [personalizedLists, setPersonalizedLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Scroll refs
  const containerRefWatchlist = useRef();
  const containerRefWatched   = useRef();
  const containerRefHighest   = useRef();
  const containerRefLowest    = useRef();
  const containerRefFav       = useRef();

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const resp = await fetch("http://localhost:4000/get-session", {
          credentials: "include",
        });
        const data = await resp.json();
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setError("Session non trouvée");
        }
      } catch (err) {
        console.error("Erreur session:", err);
        setError("Erreur de session");
      }
    };
    fetchUserSession();
  }, []);

  const refreshLists = async () => {
    if (!user.utilisateur_id) return;
    setLoading(true);
    try {
      const [
        watchlistRes,
        watchedRes,
        favoritesRes,
        personalizedRes
      ] = await Promise.all([
        fetch(`http://localhost:4000/api/watchlist/${user.utilisateur_id}`),
        fetch(`http://localhost:4000/api/watched/${user.utilisateur_id}`),
        fetch(`http://localhost:4000/api/favorites/${user.utilisateur_id}`),
        fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${user.utilisateur_id}`)
      ]);

      if (!watchlistRes.ok || !watchedRes.ok || !favoritesRes.ok || !personalizedRes.ok) {
        throw new Error("Failed to fetch one or more lists");
      }

      const watchlistData    = await watchlistRes.json();
      const watchedData      = await watchedRes.json();
      const favoritesData    = await favoritesRes.json();
      const personalizedData = await personalizedRes.json();

      // Clean and dedupe
      const cleanedWatchlist = watchlistData.filter(m => m.title && m.title !== "N/A");
      const cleanedWatched   = watchedData.filter(m => m.title && m.title !== "N/A");
      const watchedIds       = cleanedWatched.map(m => m.id);
      const filteredWatch    = cleanedWatchlist.filter(m => !watchedIds.includes(m.id));

      setWatchlist(filteredWatch);
      setWatched(cleanedWatched);
      setFavorites(favoritesData.data || favoritesData || []);

      // Ratings split
      const high = cleanedWatched.filter(m => m.valeur_note >= 3);
      const low  = cleanedWatched.filter(m => m.valeur_note <= 2);
      setHighestRated(high.sort((a,b) => b.valeur_note - a.valeur_note));
      setLowestRated(low.sort((a,b) => a.valeur_note - b.valeur_note));

      setPersonalizedLists(personalizedData.data || personalizedData || []);

      // If a list is open, refresh its contents
      if (selectedList) {
        const updated = (personalizedData.data || personalizedData || [])
          .find(l => l._id === selectedList._id);
        if (updated) setSelectedList(updated);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleScroll = (dir, ref) => {
    if (!ref.current) return;
    const cont = ref.current;
    cont.scrollLeft += dir * cont.clientWidth;
  };

  const handleGestionList = (list) => setSelectedList(list);
  const handleCloseContainer = () => setSelectedList(null);

  const SectionDivider = () => (
    <div style={{
      width: "100%", height: "2px",
      backgroundColor: "white", opacity: 0.3,
      margin: "10px 0"
    }}/>
  );

  const renderMovieRow = (movies, ref = null) => (
    <div ref={ref} className="movie-slider scroll-films horizontal-scrollbar">
      {movies.map(movie => (
        <div key={movie.id} className="movie-wrapper">
          <div
            className="card bg-transparent border-0 h-100 affiche-film"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Poster"}
              alt={movie.title}
              className="card-img-top poster-image"
              style={{ height: 300, width: 200, objectFit: "cover" }}
              onError={e => e.currentTarget.src =
                "https://via.placeholder.com/500x750?text=No+Poster"}
            />
            <div className="card-body px-0">
              <h6 className="card-title text-white" style={{ fontSize: "1rem" }}>
                {movie.title}
              </h6>
              <p className="card-text text-white">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
                {movie.vote_average && (
                  <span className="float-end">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                )}
              </p>
              {movie.valeur_note && (
                <div className="text-warning small">
                  Your rating: {movie.valeur_note} ⭐
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const backgroundStyle = {
    background: `linear-gradient(to bottom,
      rgba(5,0,40,1), rgba(20,10,80,0.9), rgba(5,0,50,1)),
      url(${BlackImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Fredoka, sans-serif"
  };

  if (loading || error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100"
           style={backgroundStyle}>
        <div className={error ? "text-danger" : "text-white"}>
          {error ? `Error: ${error}` : "Loading..."}
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <HeaderSpace />
      <Header />

      <div className="intro-section text-center mb-5">
        <h1>Seen it? Rate it!</h1>
        <p>
          Don’t forget to leave your opinion on the movies you watch.
          Every story deserves a final word. Will it be 5 stars or 0?
        </p>
      </div>

      <div className="container">

        {/* FAVORITES */}
        <div className="text-white sectionBox">
          <h2 className="mb-3">My Favorite Movies ❤️</h2>
          <SectionDivider />
          {favorites.length > 0 ? (
            <div className="d-flex align-items-center position-relative">
              <button className="boutonScroll-gaucheW"
                      onClick={() => handleScroll(-1, containerRefFav)}>
                ‹
              </button>
              {renderMovieRow(favorites, containerRefFav)}
              <button className="boutonScroll-droiteW"
                      onClick={() => handleScroll(1, containerRefFav)}>
                ›
              </button>
            </div>
          ) : (
            <p>No favorite movies yet.</p>
          )}
        </div>

        {/* WATCHLIST */}
        <div className="text-white sectionBox">
          <h2 className="mb-3">My Watchlist</h2>
          <SectionDivider />
          {watchlist.length > 0 ? (
            <div className="d-flex align-items-center position-relative">
              <button className="boutonScroll-gaucheW"
                      onClick={() => handleScroll(-1, containerRefWatchlist)}>
                ‹
              </button>
              {renderMovieRow(watchlist, containerRefWatchlist)}
              <button className="boutonScroll-droiteW"
                      onClick={() => handleScroll(1, containerRefWatchlist)}>
                ›
              </button>
            </div>
          ) : (
            <p>Your watchlist is empty.</p>
          )}
        </div>

        {/* WATCHED */}
        <div className="text-white sectionBox">
          <h2 className="mb-3">My Watched Movies</h2>
          <SectionDivider />
          {watched.length > 0 ? (
            <div className="d-flex align-items-center position-relative">
              <button className="boutonScroll-gaucheW"
                      onClick={() => handleScroll(-1, containerRefWatched)}>
                ‹
              </button>
              {renderMovieRow(watched, containerRefWatched)}
              <button className="boutonScroll-droiteW"
                      onClick={() => handleScroll(1, containerRefWatched)}>
                ›
              </button>
            </div>
          ) : (
            <p>No movies marked as watched yet.</p>
          )}
        </div>

        {/* HIGHEST RATED */}
        <div className="text-white sectionBox">
          <h2 className="mb-3">My Highest Rated (3–5 ⭐)</h2>
          <SectionDivider />
          {highestRated.length > 0 ? (
            <div className="d-flex align-items-center position-relative">
              <button className="boutonScroll-gaucheW"
                      onClick={() => handleScroll(-1, containerRefHighest)}>
                ‹
              </button>
              {renderMovieRow(highestRated, containerRefHighest)}
              <button className="boutonScroll-droiteW"
                      onClick={() => handleScroll(1, containerRefHighest)}>
                ›
              </button>
            </div>
          ) : (
            <p>No high-rated movies yet.</p>
          )}
        </div>

        {/* LOWEST RATED */}
        <div className="text-white sectionBox">
          <h2 className="mb-3">My Lowest Rated (0–2 ⭐)</h2>
          <SectionDivider />
          {lowestRated.length > 0 ? (
            <div className="d-flex align-items-center position-relative">
              <button className="boutonScroll-gaucheW"
                      onClick={() => handleScroll(-1, containerRefLowest)}>
                ‹
              </button>
              {renderMovieRow(lowestRated, containerRefLowest)}
              <button className="boutonScroll-droiteW"
                      onClick={() => handleScroll(1, containerRefLowest)}>
                ›
              </button>
            </div>
          ) : (
            <p>No low-rated movies yet.</p>
          )}
        </div>

        {/* PERSONALIZED LISTS */}
        {personalizedLists.length > 0 && personalizedLists.map(list => (
          <div className="sectionBox" key={list._id}>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
              <h2>{list.name}</h2>
              <button
                className="btn btn-primary"
                style={{ background: "transparent", border: "none" }}
                onClick={() => handleGestionList(list)}
              >
                Manage List
              </button>
            </div>
            <SectionDivider />
            {list.movies?.length > 0
              ? renderMovieRow(list.movies)
              : <p>No movies in this list yet.</p>
            }
          </div>
        ))}

        {selectedList && (
          <ContainerManageList
            list={selectedList}
            onClose={handleCloseContainer}
            onUpdate={refreshLists}
          />
        )}

      </div>

      {/* Scrollbar styling */}
      <style>{`
        .movie-slider::-webkit-scrollbar { height: 8px; }
        .movie-slider::-webkit-scrollbar-track { background: #1c1c3c; border-radius:4px; }
        .movie-slider::-webkit-scrollbar-thumb { background: #555; border-radius:4px; }
        .movie-slider::-webkit-scrollbar-thumb:hover { background: #777; }
      `}</style>
    </div>
  );
}

export default PageWatchList;
