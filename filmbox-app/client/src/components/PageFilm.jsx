import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import imageLogo from "../assets/logo_FilmBox.png";
import BlackImage from '../assets/BlackImage.png';
import '../App.css';
import { Container } from 'react-bootstrap';
import WickedTrailer from '../assets/Video/WickedTrailer.mp4';
import WickedImage from '../assets/wicked.jpg';
import { useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../styles/PageFilm.css';

const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [erreur, setErreur] = useState(null);
  const videoRef = useRef();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);


 
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
      })
      .catch(erreur => setErreur(erreur.message));


    //this one is for getting the top rated movies
    fetch("http://localhost:4000/api/topRatedMovies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des top rated movies");
        }
        return response.json();
      })
      .then(donnees => setTopRatedMovies(donnees))
      .catch(erreur => setErreur(erreur.message));


    //this one is for getting upcoming movies 
    fetch("http://localhost:4000/api/upcomingMovies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des upcoming movies");
        }
        return response.json();
      })
      .then(donnees => setUpcomingMovies(donnees))
      .catch(erreur => setErreur(erreur.message));

    //this one is for getting actions movies 
    fetch("http://localhost:4000/api/moviesByGenres?genre=28")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème dans le chargement des films d'actions");
        }
        return response.json();
      })
      .then(donnees => setActionMovies(donnees))
      .catch(erreur => setErreur(erreur.message));


  }, []);

  // https://www.youtube.com/watch?v=1kVZEhg3Q_c
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  const containerRefDiscovery = useRef();
  const containerRefUpcoming = useRef();
  const containerRefTopRated = useRef();
  const containerRefAction = useRef();


  // ancienne const (venant de la vidéo) 
  // UTILISER COMME ÇA : handleScrollAncien (-160) et (160)
  const handleScrollAncien = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  // nouvelle const (aidée par chat)
  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = container.clientWidth; // largeur visible de la zone de scroll
      const newScrollPosition = container.scrollLeft + direction * scrollAmount;

      container.scrollLeft = newScrollPosition;
      setScrollPosition(newScrollPosition);
    }
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
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '70vh',
          overflow: 'hidden'
        }}>

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

          <Header />

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
            <p style={{ fontSize: "30px" }}>Popular</p>
            <p style={{ fontSize: "150px", fontFamily: "Jomhuria, cursive", marginBottom: "-60px", marginTop: "-60px" }}>WICKED</p>
            <p>
              Elphaba, a young woman with green skin, as she navigates life at Shiz University and forms an unlikely friendship with the popular Galinda.
              Their bond deepens as they encounter the Wizard of Oz, leading to a series of events that ultimately shape their destinies and transform
              them into the Wicked Witch of the West and Glinda the Good.
            </p>
            <button className="btn btn-light" style={{ borderRadius: "0px", border: "0px", backgroundColor: "#0352fc", color: "white", fontFamily: "Fredoka" }}>ADD TO WATCHLIST</button>
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
      <div className="container-fluid text-center mt-0" style={{ paddingTop: '50px' }}>

        {erreur ? (
          <p className="text-danger">{erreur}</p>
        ) : (

          <div>

            {/* Section Discovery */}
            <div className="titre-section">
              Start your next discovery here
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

              <button className="boutonScroll-gauche" onClick={() => handleScroll(-1, containerRefDiscovery)} > {/* Bouton gauche */}
                &lt;
              </button>

              <div className="horizontal-scroll horizontal-scrollbar" ref={containerRefDiscovery} >
                {films.map((film, index) => {
                  let cheminImage = film.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                    : BlackImage;

                  return (
                    <div key={film.id || index} className="movie-card">
                      <Link to={`/movies/${film.id}`}>
                        <img
                          src={cheminImage}
                          alt={film.title}
                          style={{ width: "150px", height: "225px", objectFit: "cover" }}
                          onError={(e) => { e.target.src = BlackImage; }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              <button className="boutonScroll-droite" onClick={() => handleScroll(1, containerRefDiscovery)} > {/* Bouton droite */}
                ›
              </button>

            </div>
            {/* Section futur */}
            <div className="titre-section">
              Sneak a peek at the future – Coming soon...
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

              <button className="boutonScroll-gauche" onClick={() => handleScroll(-1, containerRefUpcoming)} > {/* Bouton gauche */}
                &lt;
              </button>

              <div className="horizontal-scroll horizontal-scrollbar" ref={containerRefUpcoming} >

                {upcomingMovies.map((film, index) => {
                  let cheminImage = film.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                    : BlackImage;

                  return (
                    <div key={`second-${film.id || index}`} className="movie-card">
                      <Link to={`/movies/${film.id}`}>
                        <img
                          src={cheminImage}
                          alt={film.title}
                          style={{ width: "150px", height: "225px", objectFit: "cover" }}
                          onError={(e) => { e.target.src = BlackImage; }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              <button className="boutonScroll-droite" onClick={() => handleScroll(1, containerRefUpcoming)} > {/* Bouton droite */}
                ›
              </button>

            </div>

            {/* Section Top list */}

            <div className="titre-section">
              Top of the charts. Top of your list
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

              <button className="boutonScroll-gauche" onClick={() => handleScroll(-1, containerRefTopRated)} > {/* Bouton gauche */}
                &lt;
              </button>

              <div className="horizontal-scroll horizontal-scrollbar" ref={containerRefTopRated} >

                {topRatedMovies.map((film, index) => {
                  let cheminImage = film.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                    : BlackImage;

                  return (
                    <div key={`second-${film.id || index}`} className="movie-card">
                      <Link to={`/movies/${film.id}`}>
                        <img
                          src={cheminImage}
                          alt={film.title}
                          style={{ width: "150px", height: "225px", objectFit: "cover" }}
                          onError={(e) => { e.target.src = BlackImage; }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              <button className="boutonScroll-droite" onClick={() => handleScroll(1, containerRefTopRated)} > {/* Bouton droite */}
                ›
              </button>

            </div>

            {/* Section Action Movies */}
            <div className="titre-section" >
              Action Movies
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

              <button className="boutonScroll-gauche" onClick={() => handleScroll(-1, containerRefAction)} > {/* Bouton gauche */}
                &lt;
              </button>

              <div className="horizontal-scroll horizontal-scrollbar" ref={containerRefAction} >

                {actionMovies.map((film, index) => {
                  let cheminImage = film.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                    : BlackImage;

                  return (
                    <div key={`second-${film.id || index}`} className="movie-card">
                      <Link to={`/movies/${film.id}`}>
                        <img
                          src={cheminImage}
                          alt={film.title}
                          style={{ width: "150px", height: "225px", objectFit: "cover" }}
                          onError={(e) => { e.target.src = BlackImage; }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              <button className="boutonScroll-droite" onClick={() => handleScroll(1, containerRefAction)} > {/* Bouton droite */}
                ›
              </button>

            </div>

          </div>
        )}
      </div>

      {/* Fadding pour que la page et le footer blend ensemble */}
      <div
        style={{
          height: "40px",
          background: "linear-gradient(to bottom,       rgba(5, 14, 66, 1), rgba(0, 0, 255, 0.5), rgba(5, 0, 50, 1)), ",
        }}
      />

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

        .horizontal-scroll {
            overflow-x: auto;
            scroll-behavior: smooth;
            display: flex;
            gap: 16px;
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
      `}</style>
    </div>
  );
};

export default ListeFilms;