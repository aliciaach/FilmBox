import imageLogo from "../assets/logo_FilmBox.png";
import imageProfil from "../assets/icone_utilisateur.png";
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useState, useEffect } from "react";


function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
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
    <header
      className="pb-5"
      style={{
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
        {/* Logo */}
        <div className="d-flex align-items-center me-4">
          <span className="fw-bold text-white fs-4">FILM</span>
          <span className="fw-bold text-primary fs-4">BOX</span>
        </div>

        {/* séparateur */}
        <div
          className="border-start border-white opacity-50 mx-3"
          style={{ height: "30px" }}
        />

        {/* liens pages */}
        <div className="d-flex align-items-center gap-4 ms-auto me-5">
          <div className="d-flex gap-5">
            <Link to="/" className="text-white text-decoration-none fw-light nav-link-custom">
              HOME
            </Link>
            <Link to="/PageWatchList" className="text-white text-decoration-none fw-light nav-link-custom">
              MY MOVIES
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
                <ul style={{listStyleType: "none", paddingLeft: 0 }} className="search-results bg-blue-900 mt-5">
                  {results.slice(0, 5).map((movie) => (
                     <li key={movie.id}>
                     <button
                       onClick={() => navigate(`/movie/${movie.id}`)}
                       className="w-full text-left px-4 py-3 bg-blue-900 text-white"
                       style={{
                         width: "100%",
                         height: "100%",
                         background: "rgb(5, 14, 66)",
                         fontSize: "12px"
                       }}
                     >
                      {/* Movie Poster */}
                      {movie.poster_path && (<img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title}
                        style={{
                          width: "40px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                       {movie.title}
                     </button>
                   </li>
                 ))}
                 {results.length > 3 && (
                   <li>
                     <button
                       onClick={() => navigate(`/search?query=${searchInput}`)}
                       className="w-full text-left px-4 py-3 hover:bg-gray-700 text-blue-400"
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
          className="border-start border-white opacity-50 mx-3"
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
            <img
              src={imageProfil}
              alt="icone_profil"
              width="40px"
              height="40px"
              className="me-2 rounded-circle "
            />
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
              <Link className="dropdown-item" to="/">
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
