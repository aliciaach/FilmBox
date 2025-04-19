import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import BlackImage from '../assets/BlackImage.png';
import '../App.css'; 
import { Container } from 'react-bootstrap';
import WickedTrailer from '../assets/Video/WickedTrailer.mp4';
import WickedImage from '../assets/wicked.jpg';
import { useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const videoRef = useRef();

  
  //Filter states
  const [filters, setFilters] = useState({
    genre: '',
    decade: '',
    country: '',
    language: '',
    duration: ''
  });

  //les options de filtre (front end)
  const genreOptions = [
    { value: '', label: 'Tous les genres' },
    { value: '28', label: 'Action' },
    { value: '12', label: 'Adventure' },
    { value: '16', label: 'Animation' },
    { value: '35', label: 'Comedy' },
    { value: '80', label: 'Crime' },
    { value: '18', label: 'Drama' },
    { value: '27', label: 'Horror' },
    { value: '878', label: 'Science Fiction' },
    { value: '53', label: 'Thriller' }
  ];

  const decadeOptions = [
    { value: '', label: 'Toutes les décennies' },
    { value: '2020', label: 'Années 2020' },
    { value: '2010', label: 'Années 2010' },
    { value: '2000', label: 'Années 2000' },
    { value: '1990', label: 'Années 1990' },
    { value: '1980', label: 'Années 1980' }
  ];

  const countryOptions = [
    { value: '', label: 'Tous les pays' },
    { value: 'US', label: 'États-Unis' },
    { value: 'GB', label: 'Royaume-Uni' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japon' },
    { value: 'KR', label: 'Corée du Sud' }
  ];

  const languageOptions = [
    { value: '', label: 'Toutes les langues' },
    { value: 'en', label: 'Anglais' },
    { value: 'fr', label: 'Français' },
    { value: 'ja', label: 'Japonais' },
    { value: 'es', label: 'Espagnol' },
    { value: 'ko', label: 'Coréen' }
  ];


  
  const durationOptions = [
    { value: '', label: 'Toutes les durées' },
    { value: 'court', label: 'Moins de 90 min' },
    { value: 'moyen', label: '90-120 min' },
    { value: 'long', label: 'Plus de 120 min' }
  ];

  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des films");
        }
        return response.json();
      })
      .then(donnees => {
        setFilms(donnees);
        setFilteredFilms(donnees);
      })
      .catch(erreur => setErreur(erreur.message));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, films]);
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let result = [...films];
    
    if (filters.genre) {
      result = result.filter(film => 
        film.genre_ids && film.genre_ids.includes(parseInt(filters.genre))
      );
    }
    
    if (filters.decade) {
      const decadeStart = parseInt(filters.decade);
      const decadeEnd = decadeStart + 9;
      result = result.filter(film => {
        if (!film.release_date) return false;
        const year = parseInt(film.release_date.split('-')[0]);
        return year >= decadeStart && year <= decadeEnd;
      });
    }
    
    if (filters.country) {
      result = result.filter(film => 
        film.original_language === filters.country.toLowerCase()
      );
    }
    
    if (filters.language) {
      result = result.filter(film => 
        film.original_language === filters.language.toLowerCase()
      );
    }
    
    if (filters.duration) {
      result = result.filter(film => {
        
        if (!film.runtime) return false;
        if (filters.duration === 'court') return film.runtime < 90;
        if (filters.duration === 'moyen') return film.runtime >= 90 && film.runtime <= 120;
        if (filters.duration === 'long') return film.runtime > 120;
        return true;
      });
    }
    setFilteredFilms(result);
  };

  const resetFilters = () => {
    setFilters({
      genre: '',
      decade: '',
      country: '',
      language: '',
      duration: ''
    });
    setFilteredFilms(films);
  };

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
            ref={videoRef}
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
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              <img src={imageLogo} alt="Logo" style={{ width: "150px", height: "auto" }} />
            </div>
            {/* Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a
                href="/"
                style={{ textDecoration: 'none', color: '#fff', fontSize: '18px', marginTop:'-50px' }}
              >
                HOME
              </a>
              <a
                href="/PageWatchList"
                style={{ textDecoration: 'none', color: '#fff', fontSize: '18px', marginTop:'-50px'}}
              >
                MY MOVIES
              </a>
              <span style={{ fontSize: '18px', marginTop:'-50px' }}>|</span>

              {/* Profile Section */}
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop:'-25px'}}>
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
                      <span style={{ fontSize: '18px', color: '#fff'}}>Profil</span>
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
                  <Dropdown.Item href="/UserSettings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/connexion">Logout</Dropdown.Item>
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
              height: '120px',
              background: 'linear-gradient(to top, rgba(7, 0, 66, 1), rgba(7, 0, 66, 0))',
              pointerEvents: 'none',
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
                  zIndex: 10
                }}>
                <div className="mb-3">
                  <label className="form-label text-white">Genre</label>
                  <select 
                    className="form-select bg-secondary text-white"
                    name="genre"
                    value={filters.genre}
                    onChange={handleFilterChange}
                  >
                    {genreOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-white">Décennie</label>
                  <select 
                    className="form-select bg-secondary text-white"
                    name="decade"
                    value={filters.decade}
                    onChange={handleFilterChange}
                  >
                    {decadeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-white">Pays d'origine</label>
                  <select 
                    className="form-select bg-secondary text-white"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                  >
                    {countryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-white">Langue originale</label>
                  <select 
                    className="form-select bg-secondary text-white"
                    name="language"
                    value={filters.language}
                    onChange={handleFilterChange}
                  >
                    {languageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-white">Durée</label>
                  <select 
                    className="form-select bg-secondary text-white"
                    name="duration"
                    value={filters.duration}
                    onChange={handleFilterChange}
                  >
                    {durationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="d-flex justify-content-between">
                  <button 
                    className="btn btn-outline-light"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowFilters(false)}
                  >
                    Appliquer les filtres
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {erreur ? (
          <p className="text-danger">{erreur}</p>
        ) : (
          <div className="row mt-3">
            {filteredFilms.map((film, index) => {
              let cheminImage = film.poster_path 
                ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                : BlackImage;

              return (
                <div key={film.id || index} className="col-lg-2" 
                  style={{
                    paddingBottom: "25px",
                  }}>
                  <div className="card border-0 shadow movie-card" 
                    style={{
                      borderRadius: "0px",
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
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
                        onError={(e) => {
                          e.target.src = BlackImage;
                        }}
                      />
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