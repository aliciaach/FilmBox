import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import imageProfil from "../assets/icone_utilisateur.png";
import fondNoir from "../assets/BlackImage.png";
import trash from "../assets/trash-2-512 1.png";
import search from "../assets/search-13-512 1.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownDivider,
  DropdownMenu,
} from "react-bootstrap";

function AdminManagement() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const [admins, setAdmins] = useState([]);
  const [adminChoisi, setAdminChoisi] = useState(null);
  const [adminOriginal, setAdminOriginal] = useState(null);
  const [montrerModal, setMontrerModal] = useState(false);
  const [dataForm, setDataForm] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "admin",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreerAdmin = async () => {
    try {
      console.log("Donnees du nouvel admin : ", dataForm);
      const reponse = await fetch("http://localhost:4000/createAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      const data = await reponse.json();
      console.log("Reponse du serveur: ", data);

      if (reponse.ok) {
        alert("Creation Admin avec Succes");
        setMontrerModal(false);
        setDataForm({
          username: "",
          name: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          role: "admin",
          password: "",
        });
      } else {
        alert("erreur : " + data.error);
      }
    } catch (err) {
      console.error("erreu dans handleCreerAdmin:", err);
    }
  };
  const handleClickRow = (admin) => {
    setAdminChoisi(admin);
    setAdminOriginal(admin);
  };
  const handleCancel = () => {
    setAdminChoisi(adminOriginal);
  };
  const fetchAdmins = async () => {
    console.log("Fetching admins...");
    fetch("http://localhost:4000/adminsTab")
      .then((response) => response.json())
      .then((data) => {
        console.log("Admins fetched:", data);
        setAdmins(data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      });
  };
  const sortArrow = (key) => {
    if (sortConfig.key !== key) return "▲";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // You can add real search logic here when data is ready
  };
  const adminsFiltres = admins.filter((admin) => {
    const recherche = searchValue.toLowerCase();
    return (
      admin.username.toLowerCase().includes(recherche) ||
      admin.name.toLowerCase().includes(recherche) ||
      admin.lastName.toLowerCase().includes(recherche)
    );
  });
  //Appelle methode pour chercher admins
  useEffect(() => {
    fetchAdmins();
  }, []);

  //UPDATE
  const handleUpdateSave = async (e) => {
    e.preventDefault(); //Devrait empecher de refresh la page

    if (!adminChoisi) {
      console.log("Pas d'admin choisi pour modifier");
      return;
    }
    const informationsAdminModifies = {};

    const champsVerifier = [
      "username",
      "name",
      "lastName",
      "email",
      "phoneNumber",
      "role",
    ];

    champsVerifier.forEach((champ) => {
      if (
        adminChoisi[champ] !==
        adminChoisi[`old${premiereLettreMajuscule(champ)}`]
      ) {
        informationsAdminModifies[champ] = adminChoisi[champ];
        console.log("Chamgement de ce champ : " + champ);
      }
    });

    //S'il n'y a aucun changement
    if (Object.keys(informationsAdminModifies).length === 0) {
      console.log("Pas de changement!!!");
      return;
    }

    try {
      const reponse = await fetch(
        `http://localhost:4000/adminsTab/${adminChoisi._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(informationsAdminModifies),
        }
      );

      if (reponse.ok) {
        //update fonctionne
        const data = await reponse.json();
        console.log("Changement Admin reussi: ", data);

        setAdmins((prevAdmin) =>
          prevAdmin.map((admin) =>
            admin.id === adminChoisi.id
              ? { ...admin, ...informationsAdminModifies }
              : admin
          )
        );
      } else {
        console.error("Erreur dans le changement admin: ", reponse.statusText);
      }
    } catch (error) {
      console.error("Erreur durant le UPDATE: ", error);
    }
  };
  //function pour mettre premiere lettre majuscule
  const premiereLettreMajuscule = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className="bg-dark text-white min-vh-100"
      style={{
        background: `linear-gradient(to bottom,
        rgba(26, 0, 255, 0.4) 0%,
        rgba(5, 14, 68, 0.38) 13%,
        rgba(5, 0, 50, 0) 100%,
        rgba(0, 0, 255, 0.4)) 100%,    
        url(${fondNoir})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* barre de navigation */}
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
            <Link to="#" className="text-white text-decoration-none fw-light">
              ADMINS MANAGEMENT
            </Link>
            <Link to="#" className="text-white text-decoration-none fw-light">
              USERS MANAGEMENT
            </Link>
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
            <Dropdown.Item>Mon Profil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Deconnexion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      {/* Main Content */}
      <div className="container py-4 mt-5">
        <h3 className="mb-4">Admin Users Management</h3>
        <h4 className="mb-3 fw-light">Search Internal Users</h4>

        {/* Search */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control bg-transparent text-white  border-0 border-bottom rounded-0 "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              borderColor: "white",
              color: "white",
              boxShadow: "none",
              outline: "none",
            }}
          />
          <button
            className="input-group-text bg-transparent border-0 border-bottom me-0"
            style={{
              padding: "0 8px",
              cursor: "pointer",
            }}
            onClick={() => handleSearch(searchValue)}
          >
            <img src={search} alt="Search" width="20" height="20" />
          </button>
        </div>

        {/* Tableau */}
        <div
          className="table-responsive mb-3 border-bottom"
          style={{ paddingBottom: "10px" }}
        >
          <table
            className="table text-white text-center"
            style={{ backgroundColor: "transparent" }}
          >
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("username")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                >
                  Username {sortArrow("username")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                >
                  Name {sortArrow("name")}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                >
                  Email {sortArrow("email")}
                </th>
                <th
                  onClick={() => handleSort("phone")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                >
                  Phone {sortArrow("phone")}
                </th>
                <th
                  onClick={() => handleSort("lastlogin")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                >
                  Last Login {sortArrow("lastlogin")}
                </th>
                <th
                  onClick={() => handleSort("role")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                >
                  Role {sortArrow("role")}
                </th>
                <th
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                  }}
                  className="text-white"
                ></th>
              </tr>
            </thead>
            <tbody>
              {adminsFiltres && adminsFiltres.length > 0 ? (
                adminsFiltres.map((admin) => (
                  <tr
                    key={admin.id}
                    className="bg-transparent border-bottom text-white"
                    onClick={() => handleClickRow(admin)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="bg-transparent border-bottom text-white">
                      {admin.username}
                    </td>
                    <td className="bg-transparent border-bottom text-white">{`${admin.name} ${admin.lastName}`}</td>
                    <td className="bg-transparent border-bottom text-white">
                      {admin.email}
                    </td>
                    <td className="bg-transparent border-bottom text-white">
                      {admin.phoneNumber}
                    </td>
                    <td className="bg-transparent border-bottom text-white">
                      {new Date(admin.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="bg-transparent border-bottom text-white">
                      {admin.role}
                    </td>
                    <td className="text-center bg-transparent">
                      <button className="btn p-0 border-0 bg-transparent">
                        <i className="bi bi-trash">
                          <img
                            src={trash}
                            alt="delete"
                            height="20px"
                            width="20px"
                          />
                        </i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* <td colSpan="7" className="text-center text-white">
                    No admins found
                  </td> */}
                </tr>
              )}
            </tbody>
          </table>
          {/* bouton ajouter Admin */}
          <div className="d-flex justify-content-end">
            <button
              className="btn rounded-0 text-white"
              style={{ background: "rgba(111,79,255,0.3)" }}
              onClick={() => setMontrerModal(true)}
            >
              Create Admin
            </button>
          </div>
        </div>

        {/* Modal Creation Admin */}
        {montrerModal && (
          <div className="modal-backdrop-custom">
            <div className="modal-box-custom">
              <h4 className="mb-3">Create Admin</h4>

              {/* champs a completer */}

              {/* Username */}
              <input
                className="form-control mb-2"
                name="username"
                placeholder="Username"
                value={dataForm.username}
                onChange={handleChange}
              />
              {/* Prenom */}
              <input
                className="form-control mb-2"
                name="name"
                placeholder="Name"
                value={dataForm.name}
                onChange={handleChange}
              />
              {/* Nom famille */}
              <input
                className="form-control mb-2"
                name="lastName"
                placeholder="Last Name"
                value={dataForm.lastName}
                onChange={handleChange}
              />
              {/* Email */}
              <input
                className="form-control mb-2"
                type="email"
                name="email"
                placeholder="Email"
                value={dataForm.email}
                onChange={handleChange}
              />
              {/* # telephone */}
              <input
                className="form-control mb-2"
                name="phoneNumber"
                placeholder="Phone Number"
                value={dataForm.phoneNumber}
                onChange={handleChange}
              />
              {/* Role */}
              <select
                className="form-control mb-2"
                name="role"
                value={dataForm.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
              {/* Mot de Passe */}
              <input
                type="password"
                className="form-control mb-2"
                name="password"
                placeholder="Password"
                value={dataForm.password}
                onChange={handleChange}
              />
              {/* boutons Save & Cancel */}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-success me-2"
                  onClick={handleCreerAdmin}
                >
                  Create
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setMontrerModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Information Form */}
        {adminChoisi && (
          <div>
            <h5 className="mb-5 fs-3 fw-light">Admin Information</h5>
            <form>
              {/* Nom complet */}
              <div className="row mb-3">
                {/* Prenom(name) */}
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control bg-transparent text-white"
                    placeholder="John"
                    value={adminChoisi ? adminChoisi.name : ""}
                    onChange={(e) =>
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        name: e.target.value,
                      }))
                    }
                    style={{ borderColor: "rgba(116,101,247,0.6)" }}
                  />
                </div>

                {/* Nom famille (lastName) */}
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control bg-transparent text-white"
                    placeholder="Doe"
                    value={adminChoisi ? adminChoisi.lastName : ""}
                    onChange={(e) =>
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        lastName: e.target.value,
                      }))
                    }
                    style={{ borderColor: "rgba(116,101,247,0.6)" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control bg-transparent text-white"
                  placeholder="example@gmail.com"
                  value={adminChoisi ? adminChoisi.email : ""}
                  onChange={(e) =>
                    setAdminChoisi((prevAdmin) => ({
                      ...prevAdmin,
                      email: e.target.value,
                    }))
                  }
                  style={{ borderColor: "rgba(116,101,247,0.6)" }}
                />
              </div>

              {/* # telephone */}
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control bg-transparent text-white"
                  placeholder="514-123-1234"
                  value={adminChoisi ? adminChoisi.phoneNumber : ""}
                  onChange={(e) =>
                    setAdminChoisi((prevAdmin) => ({
                      ...prevAdmin,
                      phoneNumber: e.target.value,
                    }))
                  }
                  style={{ borderColor: "rgba(116,101,247,0.6)" }}
                />
              </div>

              {/* Date de Creation separee */}
              <div className="row mb-3">
                <label className="form-label text-white">
                  Date of Creation
                </label>

                {/* Section Jour*/}
                <div className="col-4">
                  <input
                    type="text"
                    placeholder="DD"
                    value={
                      adminChoisi
                        ? new Date(adminChoisi.createdAt).getDate()
                        : ""
                    }
                    readOnly
                    className="form-control bg-transparent text-white text-center"
                    style={{ borderColor: "rgba(116,101,247,0.6)" }}
                  />
                </div>

                {/* Section Mois*/}
                <div className="col-4">
                  <input
                    type="text"
                    placeholder="MM"
                    value={
                      adminChoisi
                        ? new Date(adminChoisi.createdAt).getMonth() + 1
                        : ""
                    }
                    readOnly
                    className="form-control bg-transparent text-white text-center"
                    style={{ borderColor: "rgba(116,101,247,0.6)" }}
                  />
                </div>

                {/* Section Annee */}
                <div className="col-4">
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={
                      adminChoisi
                        ? new Date(adminChoisi.createdAt).getFullYear()
                        : ""
                    }
                    readOnly
                    className="form-control bg-transparent text-white text-center"
                    style={{ borderColor: "rgba(116,101,247,0.6)" }}
                  />
                </div>
                {/* Role */}
                <div className="mb-4" style={{ maxWidth: "300px" }}>
                  <label
                    className="form-label bg-transparent text-white"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Role
                  </label>
                  <select
                    className="form-select bg-transparent text-white"
                    value={adminChoisi ? adminChoisi.role : ""}
                    onChange={(e) =>
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        role: e.target.value,
                      }))
                    }
                    style={{ borderColor: "rgba(116,101,247,0.6)" }}
                  >
                    <option className="text-dark">Choose...</option>
                    <option className="text-dark">Admin</option>
                    <option className="text-dark">Moderator</option>
                  </select>
                </div>
              </div>

              {/* bouton cancel et save */}
              <div className="d-flex justify-content-end gap-5">
                <button
                  type="button"
                  className="btn bg-transparent"
                  onClick={handleCancel}
                  style={{ color: "rgb(82,75,119)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white rounded-2 w-25"
                  onClick={handleUpdateSave}
                  style={{
                    background: "rgba(111,79,255,0.3)",
                    borderColor: "rgb(111,79,255)",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
export default AdminManagement;
