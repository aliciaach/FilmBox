import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondNoir from "../assets/BlackImage.png";
import "../styles/UserManagement.css";
import { Dropdown } from "react-bootstrap";
import imageProfil from "../assets/photo_profil.jpg";

function ManageUsers() {
  const [users, setUsers] = useState([]); // État pour stocker la liste des utilisateurs
  const [admin, setAdmin] = useState(null); // État pour stocker l'admin connecté
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [userSelectionne, setUserSelectionne] = useState(null); // Détails de l'utilisateur sélectionné
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [stats, setStats] = useState({ watched: 0, ratings: 0, comments: 0 });

  useEffect(() => {
    // Récupérer l'admin connecté
    fetch("http://localhost:4000/get-admin-session", { credentials: "include" }) //pour envoyer les cookies avec la requête
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur dans la récupération de la session");
        return response.json();
      })
      .then((data) => {
        if (data.loggedIn) {
          setAdmin(data.admin);
        } else {
          navigate("/adminLogin");
        }
      })
      .catch((erreur) => setError(erreur.message)); // Gérer les erreurs
  }, [navigate]);

  useEffect(() => {
    if (!userSelectionne) return;

    fetch(`http://localhost:4000/getStatistiques/${userSelectionne.utilisateur_id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching user stats");
        return res.json();
      })
      .then((data) => {
        setStats({
          watched: data.watchedCount,
          ratings: data.ratingCount,
          comments: data.commentCount,
        });
      })
      .catch((err) => {
        console.error(err);
        setMessage("Could not load user stats");
      });
  }, [userSelectionne]);

  useEffect(() => {
    fetch("http://localhost:4000/getUsers", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Error fetching users");
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message));
  }, []);

  const clickObtenirInformationsUser = (userId) => {
    const user = users.find((u) => u.utilisateur_id === userId);
    setUserSelectionne(user);
    setMessage("");
  };

  return (
    <div
      className="text-white"
      style={{
        boxSizing: "border-box", //
        fontFamily: "Istok Web, sans-serif",
        fontSize: "large",
        minHeight: "100vh", // Page + haute   => minHeight: '120vh', ///////
        paddingTop: "5vh", //
        paddingBottom: "15vh", //
        width: "100%",
        background: `linear-gradient(to bottom,
                rgba(26, 0, 255, 0.4) 0%,
                rgba(5, 14, 68, 0.38) 13%,
                rgba(5, 0, 50, 0) 100%,
                rgba(0, 0, 255, 0.4)) 100%,    
                url(${fondNoir})`,
        backgroundSize: "cover", //'auto'
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
            {/* Condition to switch to admin management page */}
            <span
              onClick={() => {
                if (admin?.role === "moderator") {
                  navigate("/adminManagementPage");
                } else {
                  alert("Only moderators can access this page. Please speak with a supervisor for any urgent matter.");
                }
              }}
              className="text-white text-decoration-none fw-light"
              style={{ cursor: "pointer" }}
            >
              ADMIN MANAGEMENT
            </span>
            <Link to="/userManagement" className="text-white text-decoration-none fw-light">USER MANAGEMENT</Link>


          </div>
        </div>

        {/* séparateur */}
        <div
          className="border-start border-white opacity-50 mx-3"
          style={{ height: "30px" }}
        />

        {/* Profile */}
        <Dropdown align="end">
          <Dropdown.Toggle
            as="div"
            className="d-flex align-items-center gap-1 text-white"
            style={{ cursor: "pointer" }}
            id="profile-dropdown"
          >
            <img
              src={imageProfil}
              alt="icone-profile"
              width="40"
              height="40"
              className="rounded-circle"
            />
            <i className="bi bi-person-circle fs-5" />
            <span>Profil</span>
            <i className="bi bi-caret-down-fill small" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/userSettings">
              Mon Profil
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/adminLogin">
              Deconnexion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-4 mt-4">
        <h1>
          {admin?.prenom ? `${admin.prenom} ${admin.nom} - Admin` : "Admin - Session Not Found"}
        </h1>
        {/* Je mets par défaut que le role c'est "admin" mais je vois pas d'Autre
                                                                                                  choix dans la BDD que Admin, je fais quoiiii  AAAAAA */}
        {/*<h1> Admin Name - Role Level</h1>*/}
        <button
          className="btn btn-outline-light"
          onClick={async () => {
            await fetch("http://localhost:4000/destroy-session", {
              method: "POST",
              credentials: "include"
            });
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div className="container-fluid page-container">
        <div className="row" style={{ height: "100%" }}>
          {/* Colonne gauche */}
          <div
            className="col-md-3 ms-2 me-2 colonne-scrollable "
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* Liste de boutons */}
            <div className="list-group">
              {users.map((user, index) => (
                <button
                  key={index}
                  className="list-group-item bg-transparent text-white btnUser"
                  onClick={() =>
                    clickObtenirInformationsUser(user.utilisateur_id)
                  }
                >
                  {user.nom} {user.prenom}
                </button>
              ))}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-md-8 ms-4" style={{ height: "100%" }}>
            {/* Ligne haut : Informations */}
            <div className="section-grow" style={{ flexGrow: 2 }}>
              <div>
                <div className="d-flex align-items-center gap-3 ms-2">
                  {/* Cercle avec les initiales du user selectionne*/}
                  <div
                    className="rounded-circle bg-white d-flex align-items-center justify-content-center text-dark"
                    style={{
                      width: "60px",
                      height: "60px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {userSelectionne
                      ? (userSelectionne.prenom?.[0] || "?") +
                      (userSelectionne.nom?.[0] || "?")
                      : "JD"}
                  </div>
                  <h2 className="mb-0">
                    {userSelectionne
                      ? `${userSelectionne.prenom} ${userSelectionne.nom}`
                      : "John Doe"}
                  </h2>
                </div>

                {/* Ligne séparatrice */}
                <div
                  className="w-100 mt-3"
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  }}
                />
              </div>

              <div
                className="row mb-3"
                style={{ marginTop: "8vh", fontSize: "22px" }}
              >
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2">
                    {" "}
                    First Name{" "}
                  </label>
                  <input
                    id="inputInfo"
                    type="text"
                    className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4"
                    placeholder="John"
                    value={userSelectionne ? userSelectionne.prenom : ""}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2">
                    {" "}
                    Last Name{" "}
                  </label>
                  <input
                    id="inputInfo"
                    type="text"
                    className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4"
                    placeholder="Doe"
                    value={userSelectionne ? userSelectionne.nom : ""}
                    readOnly
                  />
                </div>
              </div>

              <div
                className="row mb-3"
                style={{ marginTop: "8vh", fontSize: "22px" }}
              >
                <div className="col">
                  <label id="titresInfo" className="mb-2">
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    id="inputInfo"
                    type="text"
                    className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4"
                    placeholder="example@gmail.com"
                    value={userSelectionne ? userSelectionne.courriel : ""}
                    readOnly
                  />
                </div>
              </div>

              <div
                className="row mb-3"
                style={{ marginTop: "8vh", fontSize: "22px" }}
              >
                <div className="col">
                  <label id="titresInfo" className="mb-2">
                    {" "}
                    Phone Number{" "}
                  </label>
                  <input
                    id="inputInfo"
                    type="text"
                    className="w-100 p-2 pe-5 ps-3 text-white bg-transparent border-1 rounded-4"
                    placeholder="514-123-1234"
                    value={userSelectionne ? userSelectionne.telephone : ""}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Ligne milieu : Statistiques */}
            <div
              className="section-grow"
              style={{ flexGrow: 1, marginTop: "20vh" }}
            >
              <div className="row text-center mt-5 mb-4">
                <div className="col-md-4">
                  <h2
                    className="border border-1 rounded-4 py-5"
                    style={{ fontSize: "48px" }}
                  >
                    {stats.watched}
                  </h2>
                  <p className="mt-3" style={{ fontSize: "18px" }}>
                    Movies Watched
                  </p>
                </div>

                <div className="col-md-4">
                  <h2
                    className="border border-1 rounded-4 py-5"
                    style={{ fontSize: "48px" }}
                  >
                    {stats.ratings}
                  </h2>
                  <p className="mt-3" style={{ fontSize: "18px" }}>
                    Ratings written
                  </p>
                </div>

                <div className="col-md-4">
                  <h2
                    className="border border-1 rounded-4 py-5"
                    style={{ fontSize: "48px" }}
                  >
                    {stats.comments}
                  </h2>
                  <p className="mt-3" style={{ fontSize: "18px" }}>
                    Commentaries
                  </p>
                </div>
              </div>

              {/* Ligne séparatrice */}
              <div
                className="w-75 opacity-75 mx-auto"
                style={{
                  marginTop: "10vh",
                  marginBottom: "10vh",
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              />
            </div>

            {/* Ligne bas : séparation et bouton */}
            <div className="section-grow d-flex justify-content-center align-items-center">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;