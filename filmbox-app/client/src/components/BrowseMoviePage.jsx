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
        language: ''
    });
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [error, setError] = useState();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchMovies = async () => {
            let buildUrl = '';

            if (filters.genre) {
                buildUrl += `genre=${filters.genre}&`;
            }
            if (filters.language) {
                buildUrl += `language=${filters.language}&`;
            }
        
            const fullBuildUrlApi = `http://localhost:4000/api/discoverMoviesFiltered?${buildUrl}`;

            try {
                const response = await fetch(buildUrl);

                if (!response.ok) {
                    throw new Error("Error while loading movies");
                }

                const data = await response.json();
                setFilteredMovies(data.results);
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

                <h1>Page for the movie categories and all"</h1>

                {/* --- Filter section --- */}
                <div style={{ marginBottom: '20px' }}>
                    <label>Genre:</label>
                    <select name="genre" value={filters.genre} onChange={handleFilterChange}>
                        <option value="">All Genres</option>
                        <option value="28">Action</option>
                        <option value="35">Comedy</option>
                        <option value="18">Drama</option>
                        <option value="27">Horror</option>
                        <option value="878">Science Fiction</option>
                    </select>

                    <label style={{ marginLeft: '20px' }}>Language:</label>
                    <select name="language" value={filters.language} onChange={handleFilterChange}>
                        <option value="">All Languages</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="ja">Japanese</option>
                    </select>

                    
                </div>
                {/* UI FROM CHATGPT, JUST WANT TO TEST IF IT WORKS OR NOT */}
                <div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {filteredMovies.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {filteredMovies.map(movie => (
                                <div key={movie.id} style={{ width: '150px' }}>
                                    <img
                                        src={movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                            : "https://via.placeholder.com/150x225?text=No+Image"}
                                        alt={movie.title}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <p style={{ fontSize: '14px', marginTop: '5px' }}>{movie.title}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No movies found. Try changing filters!</p>
                    )}
                </div>

            </div>
        </>
    );
}

export default BrowseMovies;
