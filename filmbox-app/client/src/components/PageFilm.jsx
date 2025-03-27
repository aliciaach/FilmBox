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

 
const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des films");
        }
        return response.json();
      })
      .then(donnees => setFilms(donnees))
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
      <div style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
  
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
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              marginRight: '8px'
            }}
          ></div>
          <span style={{ fontSize: '18px' }}>Profil</span>
          <span style={{ fontSize: '18px', marginLeft: '5px' }}>
            &#x25BC;
          </span>
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
          <h2 style={{fontSize: "80px"}}>WICKED</h2>
          <p>
            Elphaba, a young woman with green skin, as she navigates life at Shiz University and forms an unlikely friendship with the popular Galinda. 
            Their bond deepens as they encounter the Wizard of Oz, leading to a series of events that ultimately shape their destinies and transform  
            them into the Wicked Witch of the West and Glinda the Good.
          </p>
          <button className="btn btn-light">ADD TO WATCHLIST</button>
          </div>
          <div
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100px', // adjust height of fade
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
          >
            Filtrer les films
          </button>
          
          {showFilters && (
            <div className="bg-dark p-3 mt-2 rounded" style={{ width: '300px' }}>
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
        
        {erreur ? (
          <p className="text-danger">{erreur}</p>
        ) : (
          <div className="row mt-3">
            {films.map((film, index) => {
              // How to get access to the poster image with the TMDB API, source => https://developer.themoviedb.org/docs/image-basics
              let cheminImage = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

              return (
                <div key={film.id || index} className="col-lg-2">
                  <div className="card border-0 shadow movie-card" 
                    style={{
                      borderRadius: "0px",
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      paddingBottom: "25px",
                      backgroundColor: "transparent"
                    }}>
                    <Link to={`/movies/${film.id}`} className="text-decoration-none">
                      <img
                        src={cheminImage}
                        alt={film.title}
                        className="card-img-top"
                        style={{ 
                          height: "300px", 
                          objectFit: "cover",
                          transition: 'all 0.3s ease',
                          borderRadius: "0px"
                        }}
                      />
                      {/* <div className="card-body text-center">
                        <h6 className="card-title text-white">{film.title}</h6>
                      </div> */}
                      
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
  );
};

export default ListeFilms;