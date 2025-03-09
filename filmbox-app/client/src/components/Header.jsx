import imageLogo from "../assets/logo_FilmBox.png";
function Header() {
  return (
    <header
      className="pb-5"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,1), rgba(25, 41, 124, 1))",
      }}
    >
      <nav className="d-flex justify-content-end p-3">
        <link
          to="/connexion"
          className="nav-link active text-white text-"
          style={{ fontSize: "20px" }}
          href="#"
        >
          CONNEXION
        </link>
      </nav>

      <div className="d-flex flex-column">
        <img
          src={imageLogo}
          className="img-fluid "
          alt="image-Logo"
          style={{ width: "30%", height: "30%" }}
        />

        <div className="mt-1 d-flex flex-column align-items-center px-5">
          <div className="d-flex align-items-center w-100">
            <h1
              className="text-white fw-bold mb-0 text-start me-3"
              style={{ fontFamily: "'Jomhuria', sans-serif", fontSize: "50px" }}
            >
              COLLECT MEMORIES
            </h1>
            <div className="flex-grow-1 border-top border-light border-2 ms-5 w-50"></div>
          </div>
          <div className="my-3"></div>
          <div className="d-flex align-items-center w-100">
            <div
              className="flex-grow-1 border-top border-2 border-light "
              style={{ width: "30%", marginRight: "auto" }}
            ></div>
            <h1
              className="text-white fw-bold mb-0 ms-3 "
              style={{
                fontFamily: "'Jomhuria', sans-serif",
                fontSize: "50px",
                minWidth: "250px",
              }}
            >
              ONE MOVIE AT A TIME
            </h1>
          </div>
        </div>

        <button className="btn custom-btn text-light text-start fw-light fs-4">
          GET STARTED
        </button>
      </div>
    </header>
  );
}

export default Header;
