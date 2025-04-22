import imageLogo from "../assets/logo_FilmBox.png";
import imageProfil from "../assets/icone_utilisateur.png";
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
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
        <div className="d-flex justify-content-center flex-grow-1">
          <div className="d-flex gap-5">
            <Link to="/" className="text-white text-decoration-none fw-light">
              HOME
            </Link>
            <Link to="/PageWatchList" className="text-white text-decoration-none fw-light">
              MY MOVIES
            </Link>
            <Link to="/PageWatchList" className="text-white text-decoration-none fw-light">
              REASEARCH
            </Link>
            <form action="" className="search-form">
          <input
            type="search"
            name="search"
            className="search-input"
            placeholder="Search here ..."
          />
            <i className="fa fa-search"></i>
          </form>
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
