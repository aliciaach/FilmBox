import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

function SearchResults() {
    const { searchQuery } = useParams(); //This will give what is currently in the search bar from the URL -- NOT SURE IF ITS SAFE CHECK WITH TEACHER 
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchQuery === "") {
            setResults([]);
            return;
        }

        fetch(`/api/getMoviesResults/${encodeURIComponent(searchQuery)}`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data);
            })
            .catch((err) => {
                console.error("Error while fetching search results:", err);
            });
    }, [searchQuery]);


    return (
        <>
            <div style={{
                padding: "40px",
                background: "rgb(5, 14, 66)",
                color: "white"
            }}>
                <Header />

                <h1>Search Results for "{searchQuery}"</h1>

                <ul style={{
                    listStyleType: "none",
                    paddingLeft: 0
                }}>
                    {results.map((movie) => (
                        <li key={movie.id} style={{ marginBottom: "20px" }}>
                            <p>{movie.title}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
}

export default SearchResults