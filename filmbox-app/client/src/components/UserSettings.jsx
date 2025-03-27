import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlackImage from '../assets/BlackImage.png'


/*
    https://www.youtube.com/watch?v=oYGhoHW7zqI
    Pour ajouter token eventuellement, cookies et securite : 
    https://www.youtube.com/watch?v=oExWh86IgHA
    https://www.youtube.com/watch?v=9J3UQYcro-U
*/
function UserSettings() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/get-session');
        const data = await response.json();
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setMessage("SESSION INTROUVABLE");
        }
      } catch (error) {
        console.error('Error', error);
        setMessage("Error");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.courriel, newPassword }),
      });
      const data = await response.json();
      setMessage(data.success ? "Password updated" : "Error, couldn't update password");
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage("An error occurred while updating the password.");
    }
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/deleteAccount', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await response.json();
      setMessage(data.success ? "User deleted" : "Error, couldn't delete account");
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage("An error occurred while deleting account");
    }
  };

  return (

    
    <div style={{
      fontFamily: 'Fredoka, sans-serif',
      fontWeight: 300,
           background: `linear-gradient(to bottom,
                rgba(5, 14, 66, 1),
                rgba(26, 0, 255, 0.6),
                rgba(0, 0, 255, 0.5),
                rgba(5, 0, 50, 1)),
                url(${BlackImage})`,
       
                backgroundSize: 'cover', //'auto'
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      color: '#fff'
    }}>
      {/* Header */}

      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          backgroundColor: 'rgba(116, 101, 247, 0)',
          color: '#fff'
        }}
      >
      {/* Logo */}
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>logo here !!</div>

      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a
          href="/"
          style={{ textDecoration: 'none', color: '#fff', fontSize: '18px' }}
        >
          HOME
        </a>
        <a
          href="/movies"
          style={{ textDecoration: 'none', color: '#fff', fontSize: '18px' }}
        >
          MY MOVIES
        </a>
        <span style={{ fontSize: '18px' }}>|</span>

        {/* Profile Section */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {/* Profile Avatar Placeholder */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              marginRight: '8px'
            }}
          ></div>
          <span style={{ fontSize: '18px' }}>Profil</span>
          <span style={{ fontSize: '18px', marginLeft: '5px' }}>
            &#x25BC;
          </span>
        </div>
      </nav>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" 
          rel="stylesheet" 
        />

        
      </header>
      
      {/* User Inputs */}
      <div style={{
        padding: '20px',
        maxWidth: '55%',
        margin: '0 auto'
      }}>

      {/* Return Button */}
      <div class="mb-5">
        <button
          style={{
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(116, 101, 247, 0)',
            color: '#fff',
            border: '2px solid #FFFFFF',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => window.history.back()}
        >
          &lt;
        </button>
      </div>

      <div class="mb-5" style={{ textAlign: 'start' }}>
        <h2 style={{ fontSize: '40px', fontFamily: "fredoka", fontWeight: 'bolder' }}>User Settings</h2>
      </div>

      
       {/* First Name Input */}
       <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem', fontWeight: 400 }}>First Name</p>
            <input
              className="w-100 pe-5 ps-3 text-white border-1 rounded-1"
              type="text"
              placeholder={user.prenom || "First Name"}
              required
              value={user.firstName || ""}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              style={{
                padding: '0.70rem',
                border: 'solid #FFFFFF',
                backgroundColor: 'rgba(116, 101, 247, 0)',
                outline: 'none',
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Last Name</p>
            <input
              className="w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2"
              type="text"
              placeholder={user.nom || "Last Name"}
              value={user.nom || ""}
              onChange={(e) => setUser({ ...user, nom: e.target.value })}
              style={{
                border: 'solid #FFFFFF',
                backgroundColor: 'rgba(116, 101, 247, 0)',
                outline: 'none',
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Email</p>
            <input
              className="w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2"
              type="email"
              placeholder={user.courriel || "Email"}
              value={user.courriel || ""}
              onChange={(e) => setUser({ ...user, courriel: e.target.value })}
              style={{
                border: 'solid #FFFFFF',
                backgroundColor: 'rgba(116, 101, 247, 0)',
                outline: 'none',
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Phone Number</p>
            <input
              className="w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2"
              type="text"
              placeholder={user.telephone || "Phone Number"}
              value={user.telephone || ""}
              onChange={(e) => setUser({ ...user, telephone: e.target.value })}
              style={{
                border: 'solid #FFFFFF',
                backgroundColor: 'rgba(116, 101, 247, 0)',
                outline: 'none',
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
            />
          </div>

          {/* Password Input (read-only) */}
          <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Password</p>
            <input
              className="w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2"
              type="password"
              placeholder="***********"
              style={{
                border: 'solid #FFFFFF',
                backgroundColor: 'rgba(116, 101, 247, 0)',
                outline: 'none',
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
              readOnly
            />
          </div>

          {/* Confirm New Password Input */}
          <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>New Password</p>
            <input
              className="w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2"
              type="password"
              style={{
                border: 'solid #FFFFFF',
                backgroundColor: 'rgba(116, 101, 247, 0)',
                outline: 'none',
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
            />
          </div>
        {/* Change Password Form 
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              padding: '10px',
              width: '50%',
              marginRight: '10px'
            }}
          />
          <button type="submit" className="btn btn-primary">
            Update Password
          </button>
        </form>*/}

        {/* Delete Account Form */}
        <form onSubmit={handleSubmitDelete}>
          <button type="submit" className="btn btn-danger">
            Delete Account
          </button>
        </form>

        <p style={{ fontSize: '10px'}}>Ce site est protégé par reCAPTCHA et la politique de confidentialité et les conditions d'utilisation de FilmBox s'appliquent.</p>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#123456',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p>footer not done yettt !!</p>
      </footer>
    </div>
  );
}

export default UserSettings;
