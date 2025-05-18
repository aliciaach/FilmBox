import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import BlackImage from '../assets/BlackImage.png'
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
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);

 
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
            setError("Session non trouvée");
          }
        } catch (err) {
          console.error("Erreur session:", err);
          setError("Erreur de session");
        } 
      };
  
      fetchUserSession();
    }, []);

  /* POUR DÉFILER */
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  const containerRefWatchlist = useRef();
  const containerRefWatched = useRef();
  const containerRefHighest = useRef();
  const containerRefLowest = useRef();

  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = container.clientWidth; // largeur visible de la zone de scroll
      const newScrollPosition = container.scrollLeft + direction * scrollAmount;

      container.scrollLeft = newScrollPosition;
      setScrollPosition(newScrollPosition);
    }
  };
/* FIN DU DÉFILER */

  const handleGestionList = (list) => {
    setSelectedList(list);  // On stocke l’objet complet
  };
 
  const handleCloseContainer = () => {
    setSelectedList(null);  // Pour fermer
  };
 
  const refreshLists = async () => {
    try {
      const [watchlistRes, watchedRes, personalizedRes, favoritesRes] = await Promise.all([
        fetch(`http://localhost:4000/api/watchlist/${user.utilisateur_id}`),
        fetch(`http://localhost:4000/api/watched/${user.utilisateur_id}`),
        fetch(`http://localhost:4000/api/favorites/${user.utilisateur_id}`),
        fetch(`http://localhost:4000/mongo/getPersonalizedList?userId=${user.utilisateur_id}`)
      ]);
 
      if (!watchlistRes.ok || !watchedRes.ok) {
        throw new Error('Failed to fetch watchlist or watched movies');
      }
         
      const watchlistData = await watchlistRes.json();
      const watchedData = await watchedRes.json();
      const favoritesData = await favoritesRes.json();
      const personalizedData = await personalizedRes.json();
 
      const cleanedWatchlist = watchlistData.filter(m => m.title && m.title !== "N/A"); //Filters out any movies from the watchlist that don’t have a valid title.
      const cleanedWatched = watchedData.filter(m => m.title && m.title !== "N/A");
      const cleanedFavorites = favoritesData.filter(m => m.title && m.title !== "N/A");

      const watchedIds = cleanedWatched.map(m => m.id);//Extracts all movie IDs from the watched list (to know which ones have already been watched).
      const filteredWatchlist = cleanedWatchlist.filter(m => !watchedIds.includes(m.id)); //Keeps only the movies that are in the watchlist but not in the watched list (to avoid duplicates).
 
      setWatchlist(filteredWatchlist);
      setWatched(cleanedWatched);
      setFavorites(cleanedFavorites);
 
 
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
  }, [user]);
 
  const renderMovieRow = (movies, scrollRef = null) => (
    <div ref={scrollRef} /* AJOUT */ className="movie-slider scroll-films horizontal-scrollbar" >

      {movies.map((movie) => (
        <div key={movie.id} className="movie-wrapper">
          <div
            className="card bg-transparent border-0 h-100 affiche-film" 
            onClick={() => navigate(`/movies/${movie.id}`)} 
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"}
              alt={movie.title}
              className="card-img-top poster-image"
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
  background: `linear-gradient(to bottom,
    rgba(5, 0, 40, 1),
    rgba(20, 10, 80, 0.9),
    rgba(5, 0, 50, 1)), 
    url(${BlackImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: "#fff",
  padding: "20px",
  minHeight: "100vh",
  fontFamily: "Fredoka, sans-serif"
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
 
        <div className="intro-section">
          <h1>Seen it? Rate it!</h1>
          <p>
            Don’t forget to leave your opinion on the movies you watch.
            Every story deserves a final word. Will it be 5 stars or 0? The ending is yours to decide!
          </p>
        </div>
 
        <div className="container">

          {/* FAVORITES */}
          <div className="text-white sectionBox">
            <h2 className="text-white text-decoration-none mb-4">My Favorite Movies ❤️</h2>
            <SectionDivider />

            {favorites.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

                <button className="boutonScroll-gaucheW" onClick={() => handleScroll(-1, containerRef)}> 
                  &lt;
                </button>

                {renderMovieRow(favorites, containerRef)} 

                <button className="boutonScroll-droiteW" onClick={() => handleScroll(1, containerRef)}>
                  &gt;
                </button>
              </div>
            ) : (
              <p>No favorite movies yet.</p>
            )}
          </div>
                    
          {/* WATCHLIST */}
          <div className="text-white sectionBox" >
            <h2 >My Watchlist</h2>
            <SectionDivider />

            {watchlist.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

                <button className="boutonScroll-gaucheW"  onClick={() => handleScroll(-1, containerRefWatchlist)} > {/* Bouton gauche */}
                  &lt;
                </button>

                {renderMovieRow(watchlist, containerRefWatchlist)} {/* Contenu */} 
                
                <button className="boutonScroll-droiteW" onClick={() => handleScroll(1, containerRefWatchlist)} > {/* Bouton droite */} 
                  &gt;
                </button>
              </div>
            ) : (
              <p>Your watchlist is empty.</p>
            )}
          </div>

          {/* WATCHED */}

          <div className="text-white sectionBox">
            <h2 >My Watched Movies</h2>
            <SectionDivider />

            {watched.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

                <button className="boutonScroll-gaucheW"  onClick={() => handleScroll(-1, containerRefWatched)} > {/* Bouton gauche */}
                  &lt;
                </button>

                {renderMovieRow(watched, containerRefWatched)} {/* Contenu */} 
                
                <button className="boutonScroll-droiteW" onClick={() => handleScroll(1, containerRefWatched)} > {/* Bouton droite */} 
                  &gt;
                </button>
              </div>
            ) : (
              <p>No movies marked as watched yet.</p>
            )}
          </div>

          {/* HIGHEST RATED MOVIES */} 
          <div className="text-white sectionBox">
            <h2 >My Highest Rated Movies(3-5 ⭐)</h2>
            <SectionDivider />

            {highestRated.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

                <button className="boutonScroll-gaucheW"  onClick={() => handleScroll(-1, containerRefHighest)} > {/* Bouton gauche */}
                  &lt;
                </button>

                {renderMovieRow(highestRated, containerRefHighest)} {/* Contenu */} 
                
                <button className="boutonScroll-droiteW" onClick={() => handleScroll(1, containerRefHighest)} > {/* Bouton droite */} 
                  &gt;
                </button>
              </div>
            ) : (
              <p>No high rated movies yet.</p>
            )}
          </div>

          {/* LOW RATED MOVIES */}  
           <div className="text-white sectionBox">
            <h2 >My Lowest Rated Movies (0-2 ⭐)</h2>
            <SectionDivider />

            {lowestRated.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

                <button className="boutonScroll-gaucheW"  onClick={() => handleScroll(-1, containerRefLowest)} > {/* Bouton gauche */}
                  &lt;
                </button>

              {renderMovieRow(lowestRated, containerRefLowest)} {/* Contenu */} 
                
                <button className="boutonScroll-droiteW" onClick={() => handleScroll(1, containerRefLowest)} > {/* Bouton droite */} 
                  &gt;
                </button>
              </div>
            ) : (
              <p>No low rated movies yet.</p>
            )}
          </div>
 
          {/* Render personalized lists only if there are any movies */}
 
 
          {personalizedLists.length > 0 && personalizedLists.map((list) => (
            <div className="sectionBox" key={list._id}>
              <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <h2 className="fw-bold mt-0">{list.name}</h2>
                <button className="btn btn-primary manage-list-button" onClick={() => handleGestionList(list)} >Manage List</button>
              </div>
              <SectionDivider />
              {list.movies && list.movies.length > 0 ? renderMovieRow(list.movies) : <p>No movies in this list yet.</p>}
            </div>
          ))}
 
          {selectedList && ( //Si une liste est selectionnée, on affiche le container
            <ContainerManageList list={selectedList} onClose={handleCloseContainer} onUpdate={refreshLists} />
          )} 
        </div>
      </div>
    </>
  );
}
 
export default PageWatchList;