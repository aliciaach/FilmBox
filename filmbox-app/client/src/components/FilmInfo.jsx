import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WickedImage from "../assets/wicked.jpg";
import { Dropdown, DropdownButton } from "react-bootstrap";
import RedHeartIcon from "../assets/redHeart.png";
import EmptyHeartIcon from "../assets/emptyHeart.png";
//import "bootstrap-icons/font/bootstrap-icons.css";

const FilmInfo = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [imageLogo, setImageLogo] = useState(null);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const buttonStyle = {
    borderRadius: "0px",
    border: "0px",
    backgroundColor: "#0352fc",
    color: "white",
    fontFamily: "Fredoka",
  };

  useEffect(() => {
    if (!filmId || isNaN(Number(filmId))) {
      setErreur("ID de film invalide.");
      return;
    }

    fetch(`http://localhost:4000/api/movies/${filmId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Film introuvable");
        return res.json();
      })
      .then((data) => {
        setFilm(data);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setErreur(err.message);
      });
  }, [filmId]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/movies/${filmId}/images`)
      .then((res) => {
        if (!res.ok) throw new Error("Images introuvables");
        return res.json();
      })
      .then((data) => {
        setImageLogo(data.logos[0]);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setErreur(err.message);
      });
  }, [filmId]);

  if (erreur) return <p className="text-danger text-center">{erreur}</p>;
  if (!film) return <p className="text-center text-white">Chargement...</p>;

  const cheminImage = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
  const filmTitle = film.title;
  const genres = film.genres?.map((g) => g.name).join(", ");
  const countries = film.production_companies?.map((c) => c.origin_country).join(", ");

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(7, 0, 66, 0.5), rgba(5, 0, 50, 0.7)), url(${cheminImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        fontFamily: "Fredoka",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>logo here !!</div>
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a href="/" style={{ textDecoration: "none", color: "#fff" }}>HOME</a>
          <a href="/movies" style={{ textDecoration: "none", color: "#fff" }}>MY MOVIES</a>
          <span>|</span>
          <DropdownButton
            id="dropdown-basic-button"
            align="end"
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#fff", marginRight: 8 }}></div>
                <span style={{ color: "#fff" }}>Profil</span>
              </div>
            }
            variant="transparent"
            style={{ background: "transparent", border: "none" }}
          >
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </DropdownButton>
        </nav>
      </header>

      <div className="container py-5 text-start" style={{
        marginTop: "20px",
        marginLeft: "30px",  
        marginRight: "auto",        
        maxWidth: "800px",       
      }}>
        {/*<h3 className="mb-4">{filmTitle}</h3>*/}
        {imageLogo && (
        <img
          //NEED TO ADD SOMETHING TO GET THE LOGOS IN ENGLISH ONLY !! 
          src={`https://image.tmdb.org/t/p/original${imageLogo.file_path}`}
          alt="Movie logo"
          style={{
            maxWidth: "100%",      
            maxHeight: "100px",    
            marginBottom: "20px",
            objectFit: "contain",  
          }}
        />
        )}
        <div className="mb-4" style={{ fontSize: "16px"}}>
          {new Date(film.release_date).getFullYear()} &bull; {film.runtime} min &bull; {genres} 
        </div>    

        <div className="row">
          <div>
            <p>
              {film.overview};
            </p>
          </div>
          <div className="col-md-6 mb-3" style={{ fontSize: "16px"}}>
            <p className="mb-1"><strong>Réalisateur: </strong>A AJOUTER API PAS TROUVER</p>
          </div>
          <div className="mb-3" style={{ fontSize: "16px"}}>
            <p className="mb-1"><strong>Langue originale:</strong> {film.original_language}</p>
          </div>
          <div className="mb-3" style={{ fontSize: "16px"}}>
            <p className="mb-1"><strong>Pays d'origine:</strong> {countries}</p>
          </div>

        </div>
        <div>
          {/*gotta add the icons here for each button*/}
          <div className="d-flex align-items-center gap-3 mt-4">
  {/* Mark as Watched */}
  <button className="btn btn-light d-flex align-items-center gap-2 px-4 py-2" style={{backgroundColor: "#fff",
  color: "#000",
  fontWeight: "500",
  borderRadius: "3px",
  fontFamily: "Fredoka",}}>
    MARK AS WATCHED
  </button>

  {/* Add to Watchlist */}
  <button className="btn d-flex align-items-center gap-2 px-4 py-2" style={{backgroundColor: "rgba(255,255,255,0.1)",
  color: "#fff",
  fontWeight: "500",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "3px",
  fontFamily: "Fredoka",}}>
    WATCHLIST
  </button>

  {/* Favorite -- AJOUTER UNE ANIMATION POUR DEVENIR ROUGE LORSQUE FAVORIT !!*/}
  <button
  className="btn d-flex align-items-center justify-content-center rounded-circle"
  style={{
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "none",
    width: "40px",
    height: "40px",
    padding: "0",
  }}
>
  <img src={EmptyHeartIcon} alt="favorite" style={{ width: "20px", height: "20px" }} />
</button>
</div>

</div>

          <div
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '120px', // adjust height of fade
    background: 'linear-gradient(to top, rgba(7, 0, 66, 1), rgba(7, 0, 66, 0))',
    pointerEvents: 'none', // let clicks pass through
    zIndex: 1
  }}
></div>
        </div>
      </div>
  );
};

export default FilmInfo;
