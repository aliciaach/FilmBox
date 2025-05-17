import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlackImage from '../assets/BlackImage.png'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/UserSettings.css';
import { validEmail, validPassword, validName, validPhoneNumber } from './regex';
import HeaderSpace from '../Functions/HeaderSpace';

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
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [tempoUser, setTempoUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const navigate = useNavigate();

  //Save all the validation erros in the same variable
  const [validationErrors, setValidationErrors] = useState({
    prenom: '',
    nom: '',
    courriel: '',
    telephone: '',
    newPassword: '',
    confirmPassword: ''
  });
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

    const errors = { ...validationErrors };
    let isValid = true;

    // Check if the password respects the minimum requirement
    if (!validPassword.test(newPassword)) {
      errors.newPassword = "Not complexe enough";
      isValid = false;
    } else {
      errors.newPassword = "";
    }

    // Confirm password match
    if (newPassword !== confirmNewPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      errors.confirmPassword = "";
    }

    setValidationErrors(errors);

    if (!isValid) {
      setValidationErrors(errors);
      setMessage("Please fix the password errors before submitting.");
      return;
    }


    try {
      const response = await fetch('http://localhost:4000/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.courriel, currentPassword, newPassword }),
      });
      const data = await response.json();


      if (!response.ok) {
        console.log("Server responded with:", response.status, data.message);
        setMessage(data.message || "An unknown error occurred");
        return;
      }

      setMessage(data.success ? "Password updated" : "Error, couldn't update password");
      setNewPassword('');
      setConfirmNewPassword('');
      setCurrentPassword('');
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

      if (data.success) {
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

    const errors = { ...validationErrors };
    let isValid = true;

    if (!validName.test(tempoUser.prenom)) {
      errors.prenom = "Invalid name: letters only";
      isValid = false;
    } else {
      errors.prenom = '';
    }

    if (!validName.test(tempoUser.nom)) {
      errors.nom = "Invalid name: letters only";
      isValid = false;
    } else {
      errors.nom = '';
    }

    if (!validEmail.test(tempoUser.courriel)) {
      errors.courriel = "Invalid email adress";
      isValid = false;
    } else {
      errors.courriel = '';
    }

    if (!validPhoneNumber.test(tempoUser.telephone)) {
      errors.telephone = "Phone number can only contain numbers";
      isValid = false;
    } else {
      errors.telephone = '';
    }

    setValidationErrors(errors);

    if (!isValid) {
      setMessage("Corrige les erreurs du formulaire.");
      return;
    }
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
      if (data.success) {
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

        <HeaderSpace />
        <Header />



        <div className="d-flex" style={{ minHeight: '100vh', position: 'relative' }} >

          {/* Colonne gauche - Return Button */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '10vh',
            paddingLeft: '10vh'
          }}>

            {/* Return Button */}
            <div class="" >
              <button
                style={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(116, 101, 247, 0)',
                  color: '#fff',
                  border: '2px solid #FFFFFF',
                  fontSize: '1.5rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => window.history.back()}>

                &lt;
              </button>
            </div>
          </div>

          {/* Colonne droite - CONTENU */}
          <div className="flex-grow-1" style={{ maxWidth: '55%', margin: '0 auto' }}>

            {/* Titre */}
            <h2 style={{ fontSize: '40px', fontFamily: "fredoka", fontWeight: 'bolder', marginTop: '10vh', marginBottom: '5vh' }}>
              User Settings
            </h2>

            {/* TOP PART SECTION WITH USER'S NAME AND ALL*/}
            <div class="mb-4 d-flex align-items-center gap-3" style={{ textAlign: 'start' }}>

              {/* Icone profile avec les initiale */}
              {initials && (
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgb(3, 0, 40)',
                    color: '#fff',
                    fontWeight: '300',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                  }}
                >
                  {initials}
                </div>
              )}

              {/* Nom Prenom */}
              <h3 className="mb-0" style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif', fontWeight: 'bolder' }}>
                {user.prenom} {user.nom}
              </h3>

            </div>

            {/* Ligne séparatrice */}
            <div className="w-100 " style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />

            {/* Informations du user */}
            <div className="settings-container">
              <div class="row">

                {/* First Name Input */}
                <div className="input-section col-6">
                  <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>First Name</p>
                  <input
                    className="inputFormSettings"
                    type="text"
                    placeholder={user.prenom || "John"}
                    required
                    value={tempoUser.prenom || ""}
                    onChange={(e) => setTempoUser({ ...tempoUser, prenom: e.target.value })}
                  />
                  {validationErrors.prenom && (
                    <p className="text-danger mt-1">{validationErrors.prenom}</p>
                  )}
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
              {validationErrors.nom && (
                <p className="text-danger mt-1">{validationErrors.nom}</p>
              )}

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
              {validationErrors.courriel && (
                <p className="text-danger mt-1">{validationErrors.courriel}</p>
              )}

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
              {validationErrors.telephone && (
                <p className="text-danger mt-1">{validationErrors.telephone}</p>
              )}

              {/* Boutons Cancel et Save*/}
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
                    <button type="submit" className="btnSaveCustom w-100" style={{ backgroundColor: "rgba(111, 79, 255, 0.3)", color: "white", }} >
                      Save
                    </button>
                  </form>
                </div>
              </div>

            </div>



            {/* Container to update the passerword */}
            <div className="settings-container">
              <form onSubmit={handleSubmit} className="mb-3">


                <div className="input-section">
                  <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Current Password</p>
                  <input
                    className="inputFormSettings"
                    type="password"
                    placeholder="Enter current password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="input-section">
                  <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>New Password</p>
                  <input
                    className="inputFormSettings"
                    type="password"
                    placeholder="Enter new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {validationErrors.newPassword && (
                  <p className="text-danger mt-1">{validationErrors.newPassword}</p>
                )}

                <div className="input-section">
                  <p style={{ fontSize: '22px', marginBottom: '0.2rem' }}>Confirm New Password</p>
                  <input
                    className="inputFormSettings"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-danger mt-1">{validationErrors.confirmPassword}</p>
                )}

                <div className="text-end" style={{ width: '100%' }}>
                  <button type="submit" className="btnSaveCustom"
                    style={{
                      backgroundColor: "rgba(111, 79, 255, 0.3)",
                      color: "white",
                      width: "200px",
                    }}
                  >
                    Update Password
                  </button>
                </div>

              </form>
            </div>

            {/* Bouton Delete Account */}
            <div className="d-flex justify-content-center mt-4">
              <form onSubmit={handleSubmitDelete}>
                <button type="submit" className="btnDeleteCustom">
                  Delete Account
                </button>
              </form>
            </div>

            <p style={{ fontSize: '10px' }}>Ce site est protégé par reCAPTCHA et la politique de confidentialité et les conditions d'utilisation de FilmBox s'appliquent.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
