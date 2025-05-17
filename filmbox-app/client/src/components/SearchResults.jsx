import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlackImage from '../assets/BlackImage.png';
import ReactPaginate from 'react-paginate';
import HeaderSpace from '../Functions/HeaderSpace.jsx';

/*
This is the source for the whole tutorial to do the pagination thing : 
https://www.contentful.com/blog/react-pagination/
The specific code is on this github : https://github.com/contentful/react-pagination/blob/main/src/components/ReactPaginateLib.js
*/
function SearchResults() {
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
                <HeaderSpace/>
                <Header />

                <h1>Search Results for "{searchQuery}"</h1>
                <div className="container-fluid mt-4">
                    <div className="row mt-3">
                        {results.map((film, index) => {
                            let cheminImage = film.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                                : BlackImage;

                            return (
                                <div key={film.id || index} className="col-lg-2 col-md-3 col-sm-6 mb-4">
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
                                                    height: "450px",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                    transition: 'all 0.3s ease',
                                                    borderRadius: "0px"
                                                }}
                                                onError={(e) => { e.target.src = BlackImage; }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* Pagination */}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />


                {/* Styles personnalisés pour l'effet de survol */}
                <style>{`
          .movie-card:hover {
            border: 2px solid #4a6bff !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 20px rgba(74, 107, 255, 0.3) !important;
          }
          .movie-card:hover img {
            opacity: 0.9;
          }
        .pagination {
            display: flex;
            justify-content: center;
            padding-left: 0;
            list-style: none;
            margin-top: 20px;
            color: white;
        }

        .pagination li {
            margin: 0 5px;
        }
        .pagination li a {
            display: inline-block;
            padding: 10px 15px;
            background-color: rgba(255, 255, 255, 0.4);
            color:white;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .pagination li a:hover {
            background-color:rgb(0, 21, 92);
            color: white;
        }

        .pagination li.active a {
            background-color:rgb(0, 21, 92);
            color: white;
            border-color: white;
        }
        `}</style>
            </div>
        </>
    );
}

export default SearchResults;
