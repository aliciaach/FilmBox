import imageLogo from "../assets/logo_FilmBox.png";
import imageProfil from "../assets/icone_utilisateur.png";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useState, useEffect } from "react";


function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState("");
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/destroy-session", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
          localStorage.removeItem("rememberMe");
      } else {
        console.error("Error: Couldn't destroy session");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  }

  useEffect(() => {


    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/get-session');
        const data = await response.json();
        if (data.loggedIn) {
          setUser(data.user);
          const userInitials = (data.user.prenom?.[0] || '?') + (data.user.nom?.[0] || '?');
          setInitials(userInitials.toUpperCase());
        } else {
          setMessage("SESSION INTROUVABLE");
        }
      } catch (error) {
        console.error('Error', error);
        setMessage("Error");
      }
    };

    fetchUserData();

    if (searchInput === "") {
      setResults([]);
      return;
    }

    fetch(`/api/searchMovie?query=${searchInput}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        console.error("Error while fetching search results:", err);
      });
  }, [searchInput]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0))",
        }}
      >
        {/* barre de navigation */}
        <nav
          className="d-flex align-items-center px-4"
          style={{
            //   background: "linear-gradient(to right, #02002E, #030046)",
            color: "white",
            height: "60px",
            fontWeight: "500",
          }}
        >
          {/* Hamburger */}
          <div className="hamburger-icon me-3" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </div>

          {/* Logo */}
          <div className="d-flex align-items-center me-4">
            <span className="fw-bold text-white fs-4">FILM</span>
            <span className="fw-bold text-primary fs-4">BOX</span>
          </div>

          {/* séparateur */}
          <div
            className="border-start border-white opacity-50 mx-3 hide-on-mobile"
            style={{ height: "30px" }}
          />

          {/* liens pages */}
          <div className="d-flex align-items-center gap-4 ms-auto me-5">
            <div className="d-flex gap-5">
              <Link to="/listeFilms" className="text-white text-decoration-none fw-light nav-link-custom">
                HOME
              </Link>
              <Link to="/PageWatchList" className="text-white text-decoration-none fw-light nav-link-custom">
                MY MOVIES
              </Link>
              <Link to="/BrowseMovies" className="text-white text-decoration-none fw-light nav-link-custom">
                BROWSE MOVIES
              </Link>
              <div className="search-form" style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search here ..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <i className="fa fa-search"></i>

                {/* Search results -- CORRECT FRONT END NOT DONE YET */}
                {searchInput && results.length > 0 && (
                  <ul style={{
                    paddingLeft: 0,
                    width: "300px",
                    listStyleType: "none",
                    border: "1px solid white",
                    marginTop: "37px",
                    marginLeft: "-5px",
                  }}
                    className="search-results bg-blue-900">
                    {results.slice(0, 5).map((movie) => (
                      <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
                          <div
                            className="w-full text-left bg-blue-900 text-white"
                            style={{
                              width: "100%",
                              height: "90px",
                              padding: "0px",
                              background: "rgb(5, 14, 66)",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            {/* Movie Poster */}
                            {movie.poster_path && (
                              <div style={{ flex: "1", height: "100%" }}>
                                <img
                                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                  alt={movie.title}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    objectPosition: "left",
                                    display: "block",
                                    transition: "transform 0.3s ease",
                                  }}
                                  onError={(e) => { e.target.src = BlackImage; }}
                                />
                              </div>
                            )}

                            {/* Movie Title */}
                            <div style={{ flex: "2", paddingLeft: "10px" }}>
                              <span style={{ color: "white" }}>{movie.title}</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                    {results.length > 3 && (
                      <li>
                        <button
                          onClick={() => navigate(`/searchResults/${searchInput}`)}
                          className="w-full text-left hover:bg-gray-700 text-blue-400"
                          style={{
                            width: "100%",
                            height: "25px"
                          }}
                        >
                          See all results...
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Source pour comment faire animation search bar:  https://github.com/devression/animated-search-bar/blob/main/style.css */}



          {/* séparateur */}
          <div
            className="border-start border-white opacity-50 mx-3 hide-on-mobile"
            style={{ height: "30px" }}
          />

          {/* Profile */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle d-flex align-items-center gap-2 border-0 bg-transparent text-white"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* Icone profile avec les initiale */}
              {initials && (
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgb(3, 0, 40)',
                    color: '#fff',
                    fontWeight: '300',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                  }}
                >
                  {initials}
                </div>
              )}

              <i className="bi bi-person-circle fs-5" />
              <span>Profil</span>
              <i className="bi bi-caret-down-fill small" />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end mt-2"
              aria-labelledby="profileDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/userSettings">
                  My profil
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Hamburger */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/listeFilms" onClick={() => setMenuOpen(false)}>HOME</Link>
            <Link to="/PageWatchList" onClick={() => setMenuOpen(false)}>MY MOVIES</Link>
            <Link to="/BrowseMovies" onClick={() => setMenuOpen(false)}>BROWSE MOVIES</Link>
            <Link to="/userSettings" onClick={() => setMenuOpen(false)}>MY PROFILE</Link>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="dropdown-item">
              LOG OUT
            </button>
          </div>
        )}

      </header >
    </>
  );
}

export default Header;
