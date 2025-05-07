import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlackImage from '../assets/BlackImage.png'
import imageLogo from "../assets/logo_FilmBox.png";
import '../styles/AdminLogin.css';

import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/icone_arobase.png';
import cadenas from '../assets/icone_cadenas.png';
import titanicImage from '../assets/Titanic.png';



function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/adminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        console.log("WE ARE HEREE THOOOO");
        navigate('/userManagement');
      } else {
        setError(data.message || 'Erreur de connexion admin');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur serveur');
    }
  };

  return (
    
    <div className='d-flex' style={{
          fontFamily: 'Fredoka, sans-serif',
          fontWeight: 300,
               background: `linear-gradient(to bottom,
                    rgba(5, 14, 66, 1),
    
                    rgba(0, 0, 255, 0.5),
                    rgba(5, 0, 50, 1)),
                    url(${BlackImage})`,
           
                    backgroundSize: 'cover', //'auto'
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          color: '#fff'
        }}>

      {/* Bloc gauche (Formulaire) */}
      
      <div className='d-flex flex-column' style={{alignSelf: 'center', paddingTop:'5%', marginLeft:'10%'}}>

        <h1 style={{alignSelf: 'center'}} > Admin Connexion</h1>

        <form className='connexion-container d-flex flex-column' onSubmit={handleSubmit}>
          <div className='input-section'>
            <label>Username</label>
            <input className='inputFormAdmin'
              id="username"
              type="text"
              placeholder='username_123'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='input-section'>
            <label>Password</label>
            <input className='inputFormAdmin'
              type="password"
              placeholder='Enter your password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{alignSelf: 'center'}}>
            <button className='btnLogInCustom' type="submit">Log in</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Bloc droite (FilmBox) */} 
      <div className='logo-container'>
      <img src={imageLogo} alt="FilmBox Logo" className="logo-filmbox" />
      </div>     
    
    </div>
  );
}

export default AdminLogin;
