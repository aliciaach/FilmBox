import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlackImage from '../assets/BlackImage.png';
import ReactPaginate from 'react-paginate';


function BrowseMovies() {
    const { searchQuery } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [filters, setFilters] = useState({
        genre: '',
        language: '',
        decade: '',
        movieDuration: '',
        country: '',
    });
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchMovies = async () => {
            let buildUrl = '';
            if (filters.genre) {
                buildUrl += `genre=${filters.genre}&`;
            }
            if (filters.language) {
                buildUrl += `language=${filters.language}&`;
            }
            if (filters.decade) {
                buildUrl += `decade=${filters.decade}&`;
            }
            if (filters.movieDuration) {
                buildUrl += `movieDuration=${filters.movieDuration}&`;
            }
            if (filters.country) {
                buildUrl += `originCountry=${filters.country}&`;
            }

            const fullBuildUrlApi = `http://localhost:4000/discoverMoviesFiltered?${buildUrl}`;

            try {
                const response = await fetch(fullBuildUrlApi);

                if (!response.ok) {
                    throw new Error("Error while loading movies");
                }

                const data = await response.json();
                setFilteredMovies(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMovies();
    }, [filters]);


    return (
        <>
            <div style={{
                padding: "40px",
                background: "rgb(5, 14, 66)",
                color: "white",
                minHeight: "100vh"
            }}>
                <Header />

                <h1>Page for the movie categories and all</h1>

                {/* --- Filter section --- */}
                <div style={{ marginBottom: '20px' }}>
                    <label>Genre:</label>
                    <select value={filters.genre} onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
                        <option value="">All Genres</option>
                        <option value="28">Action</option>
                        <option value="35">Comedy</option>
                        <option value="18">Drama</option>
                        <option value="27">Horror</option>
                        <option value="878">Science Fiction</option>
                    </select>

                    <label style={{ marginLeft: '20px' }}>Language:</label>
                    <select value={filters.language} onChange={(e) => setFilters({ ...filters, language: e.target.value })}>
                        <option value="">All Languages</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="ja">Japanese</option>
                    </select>

                    <label style={{ marginLeft: '20px' }}>Decades:</label>
                    <select value={filters.decade} onChange={(e) => setFilters({ ...filters, decade: e.target.value })}>
                        <option value="">All Time</option>
                        <option value="2020">2020s</option>
                        <option value="2010">2010s</option>
                        <option value="2000">2000s</option>
                        <option value="1990">1990s</option>
                        <option value="1980">1980s</option>
                    </select>

                    <label style={{ marginLeft: '20px' }}>Original Country:</label>
                    <select
                        value={filters.country}
                        onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    >
                        <option value="">All Countries</option>
                        <option value="AU">Australia</option>
                        <option value="CA">Canada</option>
                        <option value="CN">China</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="HK">Hong Kong</option>
                        <option value="IN">India</option>
                        <option value="IT">Italy</option>
                        <option value="JP">Japan</option>
                        <option value="KP">North Korea</option>
                        <option value="KR">South Korea</option>
                        <option value="RU">Russia</option>
                        <option value="TR">Turkey</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                    </select>

                    <label style={{ marginLeft: '20px' }}>Movie Duration:</label>
                    <select
                        value={filters.movieDuration}
                        onChange={(e) => setFilters({ ...filters, movieDuration: e.target.value })}
                    >
                        <option value="">All Time</option>
                        <option value="0">Less than an hour</option>
                        <option value="1">One hour</option>
                        <option value="2">Two hours</option>
                        <option value="3">Four hours</option>
                        <option value="4">Over 4 hours</option>
                    </select>
                </div>

                {/* code to show the movies, based on the filters */}
                <div className="container-fluid mt-4">
                    {filteredMovies.length > 0 ? ( //If there are any filtered movies, we execute the following code and show the poster
                        <div className="row mt-3">
                            {filteredMovies.map((film, index) => {
                                const cheminImage = film.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                                    : BlackImage;

                                return (
                                    <div key={film.id || index} className="col-lg-2 col-md-3 col-sm-6 mb-4"
                                        style={{ paddingBottom: '25px' }}>
                                        <div className="card border-0 shadow movie-card"
                                            style={{
                                                borderRadius: '0px',
                                                transition: 'all 0.3s ease',
                                                transform: 'translateY(0)',
                                                backgroundColor: 'transparent'
                                            }}>
                                            <Link to={`/movies/${film.id}`} className="text-decoration-none">
                                                <img
                                                    src={cheminImage}
                                                    alt={film.title}
                                                    className="card-img-top"
                                                    style={{
                                                        height: '400px',
                                                        objectFit: 'cover',
                                                        transition: 'all 0.3s ease',
                                                        borderRadius: '0px'
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No movies found. Try changing filters !</p> //If we dont have any results, we dont show anything
                    )}

                    {/* Hover Styles */}
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
            </div>
        </>
    );
}

export default BrowseMovies;