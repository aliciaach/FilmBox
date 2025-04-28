import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlackImage from '../assets/BlackImage.png';
import ReactPaginate from 'react-paginate';


function BrowseMovies() {
    const { searchQuery } = useParams();
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    useEffect(() => {
        if (searchQuery === "") {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/getMoviesResults/${encodeURIComponent(searchQuery)}?page=${currentPage + 1}`);
                const data = await res.json();

                setResults(data?.results);
                setPageCount(data?.total_pages);
            } catch (err) {
                console.error("Error while fetching search results:", err);
            }
        };

        fetchData();
    }, [searchQuery, currentPage]);

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

            </div>
        </>
    );
}

export default BrowseMovies;
