import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/icone_arobase.png';
import photoProfil from '../assets/photo_profil.jpg';
import titanicImage from '../assets/Titanic.png';
import fondNoir from '../assets/BlackImage.png';
import '../styles/UserManagement.css';
import { useNavigate } from 'react-router-dom';


function ManageUsers(){

  const [users, setUsers] = useState([]);  // État pour stocker la liste des utilisateurs
  const [admin, setAdmin] = useState([]);  // État pour stocker l'admin connecté
  const [error, setError] = useState(null);  // État pour gérer les erreurs
  const [userSelectionne, setUserSelectionne] = useState(null);  // Détails de l'utilisateur sélectionné

  useEffect(() => {
    // Récupérer la liste des utilisateurs
    fetch("http://localhost:4000/getUsers") //requête GET pour récupérer les utilisateurs depuis l'URL
      .then((response) => { //permet de traiter la reponse quand elle arrive
        if (!response.ok) throw new Error("Erreur dans la récupération des utilisateurs"); //vérifie si la réponse HTTP est valide (statut 200 à 299).
        return response.json(); //convertir la reponse en JSON si elle est valide
      })
      .then((data) => { //récupères la liste des utilisateurs renvoyée par le serveur sous forme de JSON
        setUsers(data);  // Mettre à jour la liste des utilisateurs avec les nouvelles données
      })
      .catch((erreur) => setError(erreur.message));  // Gérer les erreurs

    // Récupérer l'admin connecté
    fetch("http://localhost:4000/get-session", { credentials: 'include' }) //pour envoyer les cookies avec la requête
      .then((response) => { 
        if (!response.ok) throw new Error("Erreur dans la récupération de la session");
        return response.json(); 
      })
      .then((data) => { 
        if(data.loggedIn){
          setAdmin(data.user);
        }

      })
      .catch((erreur) => setError(erreur.message));  // Gérer les erreurs
    }, []);
    
    const clickObtenirInformationsUser = (userId) => {
    const user = users.find(u => u.utilisateur_id === userId);
    setUserSelectionne(user);

    //Changer compte à suspended //COMME CHANGE PASSWORD dans UserSettings
    const suspendAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/suspendAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userSelectionne.utilisateur_id }),
      });
      const data = await response.json();
      setMessage(data.success ? "User suspended" : "Error, couldn't suspend user");
    } catch (error) {
      console.error('Error suspending user:', error);
      setMessage("An error occurred while  suspending the user.");
    }
  };
}; 
  

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
      <nav
        className="d-flex align-items-center px-4"
        style={{
          //   background: "linear-gradient(to right, #02002E, #030046)",
          color: "white",
          height: "60px",
          fontWeight: "500",
        }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center me-4">
          <span className="fw-bold text-white fs-4">FILM</span>
          <span className="fw-bold text-primary fs-4">BOX</span>
        </div>
         {/* séparateur */}
        <div
          className="border-start border-white opacity-50 mx-3"
          style={{ height: "30px" }}
        />

        {/* liens pages */}
          <div className="d-flex justify-content-center flex-grow-1">
          <div className="d-flex gap-5">
            <a href="/userManagement" className="text-white text-decoration-none fw-light">
              ADMINS MANAGEMENT
            </a> {/* CHANGER À LINKKKKKKK <Link to="#" */}
            <a href="#" className="text-white text-decoration-none fw-light">
              USERS MANAGEMENT
            </a>{/* CHANGER À LINKKKKKKK <Link to="#" */}
          </div>
        </div>

          {/* séparateur */}
        <div
          className="border-start border-white opacity-50 mx-3"
          style={{ height: "30px" }}
        />
        
                {/* Profile */}
        <div className="dropdown">
          <button
            className="btn dropdown-toggle d-flex align-items-center gap-2 border-0 bg-transparent text-white"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={photoProfil}
              alt="icone_profil"
              width="40px"
              height="40px"
              className="me-2 rounded-circle "
            />
            <i className="bi bi-person-circle fs-5" />
            <span>Profil</span>
            <i className="bi bi-caret-down-fill small" />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end mt-2"
            aria-labelledby="profileDropdown"
          >
            <li>
              <a className="dropdown-item" href="#">
                Mon profil
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Déconnexion
              </a>
            </li>
          </ul>
        </div>

      </nav>
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-4 mt-4">
        <h1> {admin ? `${admin.prenom} ${admin.nom} - Admin` : "Admin Name - Role Level"} </h1> {/* Je mets par défaut que le role c'est "admin" mais je vois pas d'Autre 
                                                                                                  choix dans la BDD que Admin, je fais quoiiii  AAAAAA */}
        <button className="btn btn-outline-light">Logout</button>
      </div>

      <div className="container-fluid page-container">
        <div className="row" style={{height:'100%'}}>

          {/* Colonne gauche */}
          <div className="col-md-3 ms-2 me-2 colonne-scrollable " style={{ maxHeight: '90vh', overflowY: 'auto'}}>

{/* Liste de boutons */} 
            <div className="list-group" >
                {users.map((user, index) => (
                    <button key={index} className="list-group-item bg-transparent text-white btnUser" onClick={() => clickObtenirInformationsUser(user.utilisateur_id)}>
                      {user.nom} {user.prenom}
                    </button> ))
                }
              {/*
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button>
              <button className="list-group-item bg-transparent text-white btnUser">
                FirstName LastName
              </button> */}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-md-8 ms-4" style={{height:'100%'}}>

            {/* Ligne haut : Informations */}
            <div className="section-grow" style={{ flexGrow: 2 }}>
              <div> 
                  <div className="d-flex align-items-center gap-3 ms-2">
                    <div className="ratio ratio-1x1" style={{ width: '60px' }}>
                      <img src={photoProfil} className="rounded-circle img-fluid" style={{ objectFit: 'cover' }}/>
                    </div>
                      <h2 className="mb-0">{userSelectionne ? `${userSelectionne.prenom} ${userSelectionne.nom}` : "John Doe"}</h2>
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
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="John" 
                  value={userSelectionne ? userSelectionne.prenom : ""} readOnly />
                </div>
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2"> Last Name </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="Doe" 
                   value={userSelectionne ? userSelectionne.nom : ""} readOnly />
                </div>
              </div>

              <div className="row mb-3" style={{marginTop:'8vh', fontSize:'22px'}}>
                <div className="col">
                  <label id="titresInfo" className="mb-2"> Email </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="example@gmail.com" 
                  value={userSelectionne ? userSelectionne.courriel : ""} readOnly />
                </div>
              </div>

              <div className="row mb-3" style={{marginTop:'8vh', fontSize:'22px'}}>
                <div className="col">
                  <label id="titresInfo" className="mb-2"> Phone Number </label>
                  <input id="inputInfo" type="text" className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4" placeholder="514-123-1234" 
                  value={userSelectionne ? userSelectionne.telephone : ""} readOnly />
                </div>
              </div>
            </div>
            
            {/* Ligne milieu : Statistiques */}            
            <div className="section-grow" style={{ flexGrow: 1, marginTop: '20vh' }}>
              
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
              <div className="w-75 opacity-75 mx-auto" style={{
                marginTop: '10vh',
                marginBottom:'10vh',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}/>

            </div>

            {/* Ligne bas : séparation et bouton */}
            <div className='section-grow d-flex justify-content-center align-items-center'>

              {/* Bouton Suspend Account */}
              <form onSubmit={suspendAccount} className="text-center">
                <button className=" btnCustom " style={{ fontSize: '30px' }}> {/*btn btn-outline-light*/}
                  Suspend Account
                </button>
              </form>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );

};


export default ManageUsers
