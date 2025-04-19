import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import BlackImage from '../assets/BlackImage.png';
import '../App.css'; 
import { Container } from 'react-bootstrap';
import WickedTrailer from '../assets/Video/WickedTrailer.mp4';
import WickedImage from '../assets/wicked.jpg';
const NOMBRE_DUPLICATION = 5; // Nombre de fois que les films seront dupliqués
import { useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

 
const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [actionFilms, setActionFilms] = useState([]);
  const [comedyFilms, setComedyFilms] = useState([]);
  const videoRef = useRef();

  useEffect(() => {
    //this one is getting the popular movies, adding other ones later for more categories
    fetch("http://localhost:4000/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des films");
        }
        return response.json();
      })
      .then(donnees => setFilms(donnees))
      .catch(erreur => setErreur(erreur.message));
      
      //this one is getting the action movies
    fetch("http://localhost:4000/api/movies?genre=action")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Problème dans le chargement des films d'action");
      }
      return response.json();
    })
    .then(donnees => setActionFilms(donnees))
    .catch(erreur => setErreur(erreur.message));

    //films de comedies
    fetch("http://localhost:4000/api/movies?genre=comedy")
    .then((response) => {
      if (!response.ok) throw new Error("Problème dans le chargement des films de comédie");
      return response.json();
    })
    .then(donnees => setComedyFilms(donnees))
    .catch(erreur => setErreur(erreur.message));


    }, []);


  return (
    <div className="min-vh-100" 
        style={{
               background: `linear-gradient(to bottom,
                    rgba(7, 0, 66, 1),
                    rgba(5, 0, 50, 1)),
                    url(${WickedImage})`,

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          color: '#fff',
          fontFamily: "Fredoka",
        }}>
          
      <div className="text-center mt-0">
      <div style={{ position: 'relative', width: '100%', height: '90vh', overflow: 'hidden' }}>
        <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <source src={WickedTrailer} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        <header
          style={{
            position: 'relative', 
            zIndex: 1,            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: 'rgba(116, 101, 247, 0)',
            color: '#fff'
        }}
      >
        
      {/* Logo */}
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>logo here !!</div>

      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a
          href="/"
          style={{ textDecoration: 'none', color: '#fff', fontSize: '18px' }}
        >
          HOME
        </a>
        <a
          href="/movies"
          style={{ textDecoration: 'none', color: '#fff', fontSize: '18px' }}
        >
          MY MOVIES
        </a>
        <span style={{ fontSize: '18px' }}>|</span>

        {/* Profile Section */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {/* Profile Avatar Placeholder */}
          
          <DropdownButton 
            id="dropdown-basic-button" 
            align="end"
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  marginRight: '8px'
                 }}
              ></div>
            <span style={{ fontSize: '18px', color: '#fff' }}>Profil</span>
    </div>
  }
  variant="transparent"
  style={{
    background: "transparent",
    border: "none",
    margin: "0px",
    padding: "0px"
  }}
>
  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
</DropdownButton>
</div>
      </nav>
    </header>
      
      <div className="movie-info" 
      style={{ 
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        maxWidth: '600px',
        textAlign: 'left',
        fontFamily: 'Fredoka',
        paddingBottom: '40px',
      }}
      >


          <p style={{fontSize: "30px"}}>Popular</p>
          <p style={{fontSize: "150px", fontFamily: "Jomhuria, cursive", marginBottom: "-60px", marginTop: "-60px"}}>WICKED</p>
          <p>
            Elphaba, a young woman with green skin, as she navigates life at Shiz University and forms an unlikely friendship with the popular Galinda. 
            Their bond deepens as they encounter the Wizard of Oz, leading to a series of events that ultimately shape their destinies and transform  
            them into the Wicked Witch of the West and Glinda the Good.
          </p>
          <button className="btn btn-light" style={{borderRadius: "0px", border: "0px", backgroundColor: "#0352fc", color: "white", fontFamily: "Fredoka"}}>ADD TO WATCHLIST</button>
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

      {/* Movie List Section */}
      <div className="container text-center mt-0" style={{paddingTop: '50px'}}>
         
          

        {/* Filtres déroulants */}
        <div className="mb-4 text-start">
          <button 
            className="btn btn-primary dropdown-toggle"
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded="false"
            style={{
              background: "transparent",
              border: "0px"
            }}
          >
            Filtrer les films
          </button>
          <div style={{ position: 'relative' }}>
          {showFilters && (
            <div className="bg-dark p-3 mt-2" 
              style={{ 
                width: '300px', 
                position: 'absolute',
                left: '0',
                zIndex: 10}}>
              <div className="mb-3">
                <label className="form-label text-white">Genre</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Tous les genres</option>
                  <option value="action">Action</option>
                  <option value="comedie">Comédie</option>
                  <option value="drame">Drame</option>
                  <option value="horreur">Horreur</option>
                  <option value="science-fiction">Science-fiction</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Décennie</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Toutes les décennies</option>
                  <option value="2020">Années 2020</option>
                  <option value="2010">Années 2010</option>
                  <option value="2000">Années 2000</option>
                  <option value="1990">Années 1990</option>
                  <option value="1980">Années 1980</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Pays d'origine</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Tous les pays</option>
                  <option value="usa">États-Unis</option>
                  <option value="uk">Royaume-Uni</option>
                  <option value="france">France</option>
                  <option value="japon">Japon</option>
                  <option value="coree-du-sud">Corée du Sud</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Langue originale</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Toutes les langues</option>
                  <option value="anglais">Anglais</option>
                  <option value="francais">Français</option>
                  <option value="japonais">Japonais</option>
                  <option value="espagnol">Espagnol</option>
                  <option value="coreen">Coréen</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label text-white">Durée</label>
                <select className="form-select bg-secondary text-white">
                  <option value="">Toutes les durées</option>
                  <option value="court">Moins de 90 min</option>
                  <option value="moyen">90-120 min</option>
                  <option value="long">Plus de 120 min</option>
                </select>
              </div>
              
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-light">Reset</button>
                <button className="btn btn-primary">Appliquer les filtres</button>
              </div>
            </div>
          )}

          </div>
          
        </div>
        
        {erreur ? (
          <p className="text-danger">{erreur}</p>
        ) : (

          //Popular movies
          <div className="text-start">
            <h4 className="text-white">Popular Movies</h4>
              <div className="scroll-container">
                {films.map((film, index) => {
                let cheminImage = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
                return (
                  <div key={film.id || index} className="movie-item">
                    <Link to={`/movies/${film.id}`}>
                      <img
                        src={cheminImage}
                        alt={film.title}
                        className="movie-img"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>

            
            <div className="text-start mt-5">
              <h4 className="text-white">Action Movies</h4>
                <div className="scroll-container">
                  {actionFilms.map((film, index) => {
                    let cheminImage = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
                    return (
                      <div key={film.id || index} className="movie-item">
                        <Link to={`/movies/${film.id}`}>
                          <img
                            src={cheminImage}
                            alt={film.title}
                            className="movie-img"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>


                <div className="text-start mt-5">
  <h4 className="text-white">Comedy Movies</h4>
  <div className="scroll-container">
    {comedyFilms.map((film, index) => {
      let cheminImage = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
      return (
        <div key={film.id || index} className="movie-item">
          <Link to={`/movies/${film.id}`}>
            <img
              src={cheminImage}
              alt={film.title}
              className="movie-img"
            />
          </Link>
        </div>
      );
    })}
  </div>
</div>

              </div>
            </div>
          )}
      </div>
      
      <style>{`
  .scroll-container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 20px;
    padding: 10px 0;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .movie-item {
    flex: 0 0 auto;
    width: 200px;
  }

  .movie-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    transition: transform 0.3s;
  }

  .movie-img:hover {
    transform: scale(1.05);
  }
`}</style>

    </div>
  );
};

export default ListeFilms;