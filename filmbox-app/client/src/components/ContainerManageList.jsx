import React from 'react';

const ContainerManageList = ({ list, onClose, onUpdate }) => {

    const handleRemoveMovieFromList = async (listId, movieId) => {
        try {
            await fetch(`http://localhost:4000/mongo/removeMovieFromList/${listId}/${movieId}`, {
                method: "DELETE",
            });

            onUpdate();

        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div
            className="position-fixed top-50 start-50 translate-middle bg-dark text-white p-4 rounded"
            style={{
                zIndex: 1050,
                minWidth: '600px',
                minHeight: '600px',
                maxWidth: '90%',
            }}
        >
            <h3>Managing: {list.name}</h3>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <h2 className="fw-bold mt-0">{list.name}</h2>
            </div>
            {list.movies && list.movies.length > 0 ? (
                <ul>
                    {list.movies.map((movie) => (
                        <li key={movie.id} className="d-flex justify-content-between align-items-center mb-2">
                            <span>{movie.title}</span>
                            <button className="btn btn-danger" onClick={() => handleRemoveMovieFromList(list._id, movie.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies in this list yet.</p>
            )}
            <button className="btn btn-secondary mt-3" onClick={onClose}>Close</button>
        </div>
    );
};

export default ContainerManageList;
