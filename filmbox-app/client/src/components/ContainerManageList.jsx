import React from 'react';

const ContainerManageList = ({ list, onClose }) => {
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
            <button className="btn btn-secondary mt-3" onClick={onClose}>Close</button>
        </div>
    );
};

export default ContainerManageList;


