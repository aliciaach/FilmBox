import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/icone_arobase.png';
import cadenas from '../assets/icone_cadenas.png';
import titanicImage from '../assets/Titanic.png';
import fondNoir from '../assets/BlackImage.png';
import { useNavigate } from 'react-router-dom';


function ManageUsers(){
return (
    <div className="text-white"
        style={{
            boxSizing: 'border-box', //
            fontFamily: 'Istok Web, sans-serif',
            fontSize: 'large',            

            minHeight: '100vh', // Page + haute   => minHeight: '120vh', ///////
            paddingTop: '5vh', //
            paddingBottom: '15vh', //
            width:'100%',
       
            background: `linear-gradient(to bottom,
                rgba(5, 14, 66, 1),
                rgba(26, 0, 255, 0.6),
                rgba(0, 0, 255, 0.5),
                rgba(5, 0, 50, 1)),
                url(${fondNoir})`,

            backgroundSize: 'cover', //'auto'
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}    
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-4">
        <h1>Admin Name - Role Level</h1>
        <button className="btn btn-outline-light">Logout</button>
      </div>

      <div className="container-fluid mt-4">
        <div className="row">

          {/* Colonne gauche */}
          <div className="col-md-3">
            <div className="list-group">
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-md-9">
            <div>
                <div className='row justify-content-md-start align-items-end ms-2'>
                    <img src={cadenas} className="img-fluid col-md-1" />  
                    <h2 className='col-md-8 '>John Doe</h2>
                </div>  
            
                {/* Ligne séparatrice */}
                <div className="w-100 mt-3" style={{
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}/>            
            </div>

            <div className="row mb-3" style={{marginTop:'8vh'}}>
              <div className="col-md-6">
                <label>First Name</label>
                <input type="text" className="form-control bg-transparent text-white border-light" placeholder="John" />
              </div>
              <div className="col-md-6">
                <label>Last Name</label>
                <input type="text" className="form-control bg-transparent text-white border-light" placeholder="Doe" />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );

};


export default ManageUsers
