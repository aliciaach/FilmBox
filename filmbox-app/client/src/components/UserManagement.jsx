import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/icone_arobase.png';
import cadenas from '../assets/icone_cadenas.png';
import titanicImage from '../assets/Titanic.png';
import fondNoir from '../assets/BlackImage.png';
import '../styles/UserManagement.css';
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
                rgba(26, 0, 255, 0.4) 0%,
                rgba(5, 14, 68, 0.38) 13%,
                rgba(5, 0, 50, 0) 100%,
                rgba(0, 0, 255, 0.4)) 100%,     
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

      <div className="container-fluid page-container">
        <div className="row" style={{height:'100%'}}>

          {/* Colonne gauche */}
          <div className="col-md-3">
            <div className="list-group">
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
                            <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white border-light">
                FirstName LastName
              </button>

            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-md-9" style={{height:'100%'}}>

            {/* Ligne haut : Informations */}
            <div className="section-grow" style={{ flexGrow: 2 }}>
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

              <div className="row mb-3" style={{marginTop:'8vh', fontSize:'22px'}}>
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2"> First Name </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="John" />
                </div>
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2"> Last Name </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="Doe" />
                </div>
              </div>

              <div className="row mb-3" style={{marginTop:'8vh', fontSize:'22px'}}>
                <div className="col">
                  <label id="titresInfo" className="mb-2"> Email </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="example@gmail.com" />
                </div>
              </div>

              <div className="row mb-3" style={{marginTop:'8vh', fontSize:'22px'}}>
                <div className="col">
                  <label id="titresInfo" className="mb-2"> Phone Number </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="514-123-1234" />
                </div>
              </div>
            </div>
            
            {/* Ligne milieu : Statistiques */}            
            <div className="section-grow" style={{ flexGrow: 1 }}>
              
              <div className="row text-center mt-5 mb-4">

                <div className="col-md-4">
                  <h2 className="border border-1 rounded-4 py-5" style={{ fontSize: '48px' }}>687</h2>
                  <p className="mt-3" style={{ fontSize: '18px' }}>Movies Watched</p>
                </div>

                <div className="col-md-4">
                  <h2 className="border border-1 rounded-4 py-5" style={{ fontSize: '48px' }}>18</h2>
                  <p className="mt-3" style={{ fontSize: '18px' }}>Ratings written</p>
                </div>
                
                <div className="col-md-4">
                  <h2 className="border border-1 rounded-4 py-5" style={{ fontSize: '48px' }}>6</h2>
                  <p className="mt-3" style={{ fontSize: '18px' }}>Commentaries</p>
                </div>
        
                {/*
                <div className="col-md-4">
                  <div className="border border-1 rounded-4 py-4">
                    <h2 style={{ fontSize: '48px' }}>687</h2>
                    <p style={{ fontSize: '18px' }}>Movies Watched</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border border-1 rounded-4 py-4">
                    <h2 style={{ fontSize: '48px' }}>18</h2>
                    <p style={{ fontSize: '18px' }}>Ratings written</p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="border border-1 rounded-4 py-4">
                    <h2 style={{ fontSize: '48px' }}>6</h2>
                    <p style={{ fontSize: '18px' }}>Commentaries</p>
                  </div>
                </div>
                */}
              </div>

              {/* Ligne séparatrice */}
              <div className="w-75 mt-5 mb-5 opacity-75 mx-auto" style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}/>

            </div>

            {/* Ligne bas : séparation et bouton */}
            <div className='section-grow d-flex justify-content-center align-items-center'>

              {/* Bouton Suspend Account */}
              <div className="text-center">
                <button className="btn btn-outline-light" style={{ fontSize: '30px' }}>
                  Suspend Account
                </button>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );

};


export default ManageUsers
