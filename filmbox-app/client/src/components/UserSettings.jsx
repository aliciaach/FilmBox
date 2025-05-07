import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlackImage from '../assets/BlackImage.png'
import Header from '../components/Header'; 
import { useNavigate } from 'react-router-dom';
import '../styles/UserSettings.css';

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
  const [tempoUser, setTempoUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/get-session');
        const data = await response.json();
        if (data.loggedIn) {
          setUser(data.user);
          if (data.loggedIn) {
            setUser(data.user);
            setTempoUser(data.user); 
          }
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
  
  const initials = ((user.prenom || '?')[0] + (user.nom || '?')[0]).toUpperCase();

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

      if (data.success)
      {
        await fetch('http://localhost:4000/end-session', { method: 'POST' });
        navigate('/');
      } else {
        setMessage("Error, couldn't delete account");
      }

    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage("An error occurred while deleting account");
    }
  };

  const handleSubmitSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/saveUserAccountChanges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: tempoUser.id,              
          prenom: tempoUser.prenom,
          nom: tempoUser.nom,
          courriel: tempoUser.courriel,
          telephone: tempoUser.telephone,
        }),
      });
      const data = await response.json();
      if (data.success)
      {
        console.log("RESPONSE DATA:", data);
        setUser(tempoUser);
        setMessage("USER INFORMATIONS UDPATED!!");
      } else {  
        setMessage(data.message || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      setMessage("Error while while updating user info ");
    }
  };

  const handleSubmitCancel = (e) => {
    e.preventDefault();
    setTempoUser(user);
    setMessage("Changes cancelled.");
  };
  

  return (

    <>
    <div style={{
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

      {/* TOP PART SECTION WITH USER'S NAME AND ALL*/}{/* TOP PART SECTION WITH USER'S NAME AND ALL*/}
      <div class="mb-5 d-flex align-items-center gap-3" style={{ textAlign: 'start' }}>

        

        {/* Icone profile avec les initiale */}
        {initials && (
          <div
            style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            color: 'black',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px'
          }}
          >
            {initials}
          </div>
        )}
        
        <h2 style={{ fontSize: '40px', fontFamily: "fredoka", fontWeight: 'bolder' }}>User Settings</h2>
      
      </div>

      <div className="settings-container">
          <div class="row">
            {/* First Name Input */}
            <div className="input-section col-6">
              <p style={{ fontSize: '22px', marginBottom: '0.2rem'}}>First Name</p>
              <input
                className="inputFormSettings"
                type="text"
                placeholder={user.prenom || "John"}
                required
                value={tempoUser.prenom || ""}
                onChange={(e) => setTempoUser({ ...tempoUser, prenom: e.target.value })}
              />
            </div>

            {/* Last Name Input */}
            <div className="input-section col-6">
              <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Last Name</p>
              <input
                className="inputFormSettings"
                type="text"
                placeholder={user.nom || "Doe"}
                value={tempoUser.nom || ""}
                onChange={(e) => setTempoUser({ ...tempoUser, nom: e.target.value })}

              />
            </div>
          </div>
          
           {/* Email Input */}
           <div className="input-section">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Email</p>
            <input
              className="inputFormSettings"
              type="email"
              placeholder={user.courriel || "johndoe@gmail.com"}
              value={tempoUser.courriel || ""}
              onChange={(e) => setTempoUser({ ...tempoUser, courriel: e.target.value })}
            />
          </div>

          {/* Phone Number Input */}
          <div className="input-section">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Phone Number</p>
            <input
              className="inputFormSettings"
              type="text"
              placeholder={user.telephone || "514-321-1234"}
              value={tempoUser.telephone || ""}
              onChange={(e) => setTempoUser({ ...tempoUser, telephone: e.target.value })}

            />
          </div>

          {/* Password Input (read-only) */}
          <div className="input-section">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Password</p>
            <input
              className="inputFormSettings"
              type="password"
              placeholder="***********"
              readOnly
            />
          </div>

          {/* Confirm New Password Input */}
          <div className="mb-3">
            <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>New Password</p>
            <input
              className="inputFormSettings"
              type="password"

            />
          </div>
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
<div className="row justify-content-center">
  <div className="col-auto">
    <form onSubmit={handleSubmitCancel}>
      <button type="submit" className="btn me-2" style={{ color: "white" }}>
        Cancel
      </button>
    </form>
  </div>

  <div className="col-auto">
    <form onSubmit={handleSubmitSave}>
      <button
        type="submit"
        className="btnSaveCustom w-100"
        style={{
          backgroundColor: "rgba(111, 79, 255, 0.3)",
          color: "white",
        }}
      >
        Save
      </button>
    </form>
  </div>
</div>


        {/* Delete Account Form */}
        <form onSubmit={handleSubmitDelete}>
          <button type="submit" className="btnDeleteCustom">
            Delete Account
          </button>
        </form>
        
        <p style={{ fontSize: '10px'}}>Ce site est protégé par reCAPTCHA et la politique de confidentialité et les conditions d'utilisation de FilmBox s'appliquent.</p>
      </div>
    </div>
    </>
  );
}

export default UserSettings;
