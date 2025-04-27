import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; 

function SearchResults() {


    return (
        <>
        <Header/>
        <div>
            <p>This will be my page to show the movie results</p>
        </div>
        </>
    )
}

export default SearchResults