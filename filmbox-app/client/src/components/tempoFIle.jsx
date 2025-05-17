import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import logoFilmBox from "../assets/logoFilmBox.png";
import imageProfil from "../assets/photo_profil.jpg";
import fondNoir from "../assets/BlackImage.png";
import "../styles/UserManagement.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [userSelectionne, setUserSelectionne] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/getUsers")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur dans la récupération des utilisateurs");
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((erreur) => setError(erreur.message));

    fetch("http://localhost:4000/get-session", { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur dans la récupération de la session");
        return response.json();
      })
      .then((data) => {
        if (data.loggedIn) {
          setAdmin(data.user);
        }
      })
      .catch((erreur) => setError(erreur.message));
  }, []);

  const suspendAccount = async (e) => {
    e.preventDefault();
    if (!userSelectionne) return;

    try {
      const response = await fetch("http://localhost:4000/suspendAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userSelectionne.utilisateur_id }),
      });
      const data = await response.json();
      setMessage(data.success ? "User suspended" : "Error, couldn't suspend user");
    } catch (error) {
      console.error("Error suspending user:", error);
      setMessage("An error occurred while suspending the user.");
    }
  };

  const clickObtenirInformationsUser = (userId) => {
    const user = users.find((u) => u.utilisateur_id === userId);
    setUserSelectionne(user);
    setMessage("");
  };

  return (
    <div
      className="text-white"
      style={{
        fontFamily: "Istok Web, sans-serif",
        fontSize: "large",
        minHeight: "100vh",
        paddingTop: "5vh",
        paddingBottom: "15vh",
        width: "100%",
        background: `linear-gradient(to bottom,
          rgba(26, 0, 255, 0.4) 0%,
          rgba(5, 14, 68, 0.38) 13%,
          rgba(5, 0, 50, 0) 100%,
          rgba(0, 0, 255, 0.4)) 100%,
          url(${fondNoir})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="d-flex align-items-center px-4" style={{ color: "white", height: "60px", fontWeight: "500" }}>
        <div className="d-flex align-items-center me-4">
          <span className="fw-bold text-white fs-4">FILM</span>
          <span className="fw-bold text-primary fs-4">BOX</span>
        </div>

        <div className="border-start border-white opacity-50 mx-3" style={{ height: "30px" }} />

        <div className="d-flex justify-content-center flex-grow-1">
          <div className="d-flex gap-5">
            <Link to="/adminManagementPage" className="text-white text-decoration-none fw-light">ADMINS MANAGEMENT</Link>
            <Link to="/userManagement" className="text-white text-decoration-none fw-light">USERS MANAGEMENT</Link>
          </div>
        </div>

        <div className="border-start border-white opacity-50 mx-3" style={{ height: "30px" }} />

        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="d-flex align-items-center gap-1 text-white" style={{ cursor: "pointer" }} id="profile-dropdown">
            <img src={imageProfil} alt="icone-profile" width="40" height="40" className="rounded-circle" />
            <span>Profil</span>
            <i className="bi bi-caret-down-fill small" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/userSettings">Mon Profil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/adminLogin">Déconnexion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      <div className="d-flex justify-content-between align-items-center p-4 mt-4">
        <h1>{admin ? `${admin.prenom} ${admin.nom} - Admin` : "Admin Name - Role Level"}</h1>
        <button className="btn btn-outline-light">Logout</button>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}
      {message && <p className="text-success text-center">{message}</p>}

      <div className="container-fluid page-container">
        <div className="row" style={{ height: "100%" }}>
          <div className="col-md-3 ms-2 me-2 colonne-scrollable" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <div className="list-group">
              {users.map((user, index) => (
                <button key={index} className="list-group-item bg-transparent text-white btnUser"
                  onClick={() => clickObtenirInformationsUser(user.utilisateur_id)}>
                  {user.nom} {user.prenom}
                </button>
              ))}
            </div>
          </div>

          <div className="col-md-8 ms-4" style={{ height: "100%" }}>
            <div className="section-grow" style={{ flexGrow: 2 }}>
              <div className="d-flex align-items-center gap-3 ms-2">
                <div className="rounded-circle bg-white d-flex align-items-center justify-content-center text-dark"
                  style={{ width: "60px", height: "60px", fontSize: "20px", fontWeight: "bold" }}>
                  {userSelectionne
                    ? `${userSelectionne.prenom?.[0] || "?"}${userSelectionne.nom?.[0] || "?"}`
                    : "JD"}
                </div>
                <h2 className="mb-0">
                  {userSelectionne
                    ? `${userSelectionne.prenom} ${userSelectionne.nom}`
                    : "John Doe"}
                </h2>
              </div>

              <div className="w-100 mt-3" style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

              <div className="row mb-3 mt-5" style={{ fontSize: "22px" }}>
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2">First Name</label>
                  <input id="inputInfo" type="text" className="form-control bg-transparent text-white"
                    value={userSelectionne?.prenom || ""} readOnly />
                </div>
                <div className="col-md-6">
                  <label id="titresInfo" className="mb-2">Last Name</label>
                  <input id="inputInfo" type="text" className="form-control bg-transparent text-white"
                    value={userSelectionne?.nom || ""} readOnly />
                </div>
              </div>

              <div className="row mb-3 mt-4" style={{ fontSize: "22px" }}>
                <div className="col">
                  <label id="titresInfo" className="mb-2">Email</label>
                  <input id="inputInfo" type="text" className="form-control bg-transparent text-white"
                    value={userSelectionne?.courriel || ""} readOnly />
                </div>
              </div>

              <div className="row mb-3 mt-4" style={{ fontSize: "22px" }}>
                <div className="col">
                  <label id="titresInfo" className="mb-2">Phone Number</label>
                  <input id="inputInfo" type="text" className="form-control bg-transparent text-white"
                    value={userSelectionne?.telephone || ""} readOnly />
                </div>
              </div>
            </div>

            <div className="section-grow" style={{ flexGrow: 1, marginTop: "20vh" }}>
              <div className="row text-center mt-5 mb-4">
                <div className="col-md-4">
                  <h2 className="border border-1 rounded-4 py-5" style={{ fontSize: "48px" }}>687</h2>
                  <p className="mt-3" style={{ fontSize: "18px" }}>Movies Watched</p>
                </div>
                <div className="col-md-4">
                  <h2 className="border border-1 rounded-4 py-5" style={{ fontSize: "48px" }}>18</h2>
                  <p className="mt-3" style={{ fontSize: "18px" }}>Ratings written</p>
                </div>
                <div className="col-md-4">
                  <h2 className="border border-1 rounded-4 py-5" style={{ fontSize: "48px" }}>6</h2>
                  <p className="mt-3" style={{ fontSize: "18px" }}>Commentaries</p>
                </div>
              </div>

              <div className="w-75 opacity-75 mx-auto" style={{
                marginTop: "10vh", marginBottom: "10vh", height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }} />
            </div>

            <div className="section-grow d-flex justify-content-center align-items-center">
              <form onSubmit={suspendAccount} className="text-center">
                <button className="btnCustomRouge" style={{ fontSize: "30px" }}>
                  Suspend Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
