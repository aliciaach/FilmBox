import React from 'react';
import Login from './Account';

function App() {
  return (
    <div className='login-container'>
      <h2 className="form-title">Log in with</h2>
      <div className="social-login"/>
      <button className='social-button'>
        <img src="assets/logoFilmBox.png" alt="FilmBox" className="social-icon" />
        FilmBox
      </button>
    </div>
  );
}

export default App;
