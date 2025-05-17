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
import "../styles/AdminManagement";

function AdminManagement() {
  const [sortConfig, setSortConfig] = useState();
  const [ordreDonnees, setOrdreDonnees] = useState("asc");
  const [searchValue, setSearchValue] = useState("");
  const [admins, setAdmins] = useState([]);
  const [adminChoisi, setAdminChoisi] = useState(null);
  const [adminOriginal, setAdminOriginal] = useState(null);
  const [montrerModal, setMontrerModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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
    const errors = {};
    const emailValide = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneNumberValide = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if (!dataForm.username) errors.username = "username Required";
    if (!dataForm.name) errors.name = "Name Required";
    if (!dataForm.lastName) errors.lastName = "Last Name Required";
    if (!dataForm.email || !emailValide.test(dataForm.email)) {
      errors.email = "Email required";
    }
    if (
      !dataForm.phoneNumber ||
      !phoneNumberValide.test(dataForm.phoneNumber)
    ) {
      errors.phoneNumber = "Phone Number Required";
    }
    if (!dataForm.password) errors.password = "Password must be entered";

    //si il y a des erreurs, faire un set et retourner l'erreur
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
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
        setFormErrors({});
        window.location.reload();
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

    setTimeout(() => {
      setAdminChoisi(null);
    }, 0);
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
  const sortArrow = (column) => {
    if (sortConfig != column) return null;
    return ordreDonnees === "asc" ? "↓" : "↑";
  };
  const handleSort = (column) => {
    if (sortConfig === column) {
      //inverser sens lorsque reclick
      setOrdreDonnees((prevOrdre) => (prevOrdre === "asc" ? "desc" : "asc"));
    } else {
      //sinon nouveau tri sur autre colonne
      setSortConfig(column);
      setOrdreDonnees("asc"); //par default ascendant
    }
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
  const adminsSorted = [...adminsFiltres];
  if (sortConfig) {
    adminsSorted.sort((a, b) => {
      let valA = a[sortConfig];
      let valB = b[sortConfig];

      // trier les dates
      if (sortConfig === "lastLogin") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      // trier les strings
      if (typeof valA === "string") {
        valA = valA
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        valB = valB
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      }

      if (valA < valB) return ordreDonnees === "asc" ? -1 : 1;
      if (valA > valB) return ordreDonnees === "asc" ? 1 : -1;
      return 0;
    });
  }
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
        window.location.reload();
      } else {
        console.error("Erreur dans le changement admin: ", reponse.statusText);
      }
    } catch (error) {
      console.error("Erreur durant le UPDATE: ", error);
    }
  };
  const handleSupprimerAdmin = async (adminId, adminName) => {
    const confirmerSupprimer = window.confirm(
      `Etes vous sure de vouloir supprimer "${adminName}"?`
    );
    //si non
    if (!confirmerSupprimer) return;

    try {
      const reponse = await fetch(
        `http://localhost:4000/deleteAdmin/${adminId}`,
        {
          method: "DELETE",
        }
      );
      if (reponse.ok) {
        //update fonctionne
        const data = await reponse.json();
        alert("Supprimation de l'admin reussi");

        window.location.reload();
      } else {
        console.error("Erreur dans la supprimation admin: ", data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Erreur serveur durant action de supprimer");
      // window.location.reload();
    }
  };

  //function pour mettre premiere lettre majuscule
  const premiereLettreMajuscule = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-dark text-white min-vh-100 admin-management-container">
      {/* barre de navigation */}
      <nav className="d-flex align-items-center px-4 nav-admin">
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
            <Link
              to="/adminManagementPage"
              className="text-white text-decoration-none fw-light"
            >
              ADMINS MANAGEMENT
            </Link>
            <Link
              to="/userManagement"
              className="text-white text-decoration-none fw-light"
            >
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

      {/* Main Content */}
      <div className="container py-4 mt-5">
        <h3 className="mb-4">Admin Users Management</h3>
        <h4 className="mb-3 fw-light">Search Internal Users</h4>

        {/* Search */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control bg-transparent text-white  border-0 border-bottom rounded-0 search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="input-group-text bg-transparent border-0 border-bottom me-0 btn-search"
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
                  className="text-white clickable-header"
                >
                  Username {sortArrow("username")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="text-white clickable-header"
                >
                  Name {sortArrow("name")}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="text-white clickable-header"
                >
                  Email {sortArrow("email")}
                </th>
                <th
                  onClick={() => handleSort("phone")}
                  className="text-white clickable-header"
                >
                  Phone {sortArrow("phone")}
                </th>
                <th
                  onClick={() => handleSort("lastlogin")}
                  className="text-white clickable-header"
                >
                  Last Login {sortArrow("lastlogin")}
                </th>
                <th
                  onClick={() => handleSort("role")}
                  className="text-white clickable-header"
                >
                  Role {sortArrow("role")}
                </th>
                <th className="text-white clickable-header"></th>
              </tr>
            </thead>
            <tbody>
              {adminsFiltres && adminsFiltres.length > 0 ? (
                adminsSorted.map((admin) => (
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
                      <button
                        className="btn p-0 border-0 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSupprimerAdmin(admin._id, admin.username);
                        }}
                      >
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
                className={`form-control mb-2 text-white rounded-3 border-0 ${
                  formErrors.username ? "is-invalid" : ""
                }`}
                name="username"
                placeholder="Username"
                value={dataForm.username}
                onChange={handleChange}
                style={{
                  backgroundColor: `rgba(149, 137, 255, 0.78)`,
                  color: "white",
                }}
              />
              {formErrors.username && (
                <div className="text-danger">{formErrors.username}</div>
              )}
              {/* Prenom */}
              <input
                className={`modal-input form-control mb-2 text-white rounded-3 border-0 ${
                  formErrors.name ? "is-invalid" : ""
                }`}
                name="name"
                placeholder="Name"
                value={dataForm.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="text-danger">{formErrors.name}</div>
              )}
              {/* Nom famille */}
              <input
                className={`modal-input form-control mb-2 text-white rounded-3 border-0 ${
                  formErrors.lastName ? "is-invalid" : ""
                }`}
                name="lastName"
                placeholder="Last Name"
                value={dataForm.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <div className="text-danger">{formErrors.lastName}</div>
              )}
              {/* Email */}
              <input
                className={`modal-input form-control mb-2 text-white rounded-3 border-0 ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                type="email"
                name="email"
                placeholder="Email"
                value={dataForm.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="text-danger">{formErrors.email}</div>
              )}
              {/* # telephone */}
              <input
                className={`modal-input form-control mb-2 text-white rounded-3 border-0 ${
                  formErrors.phoneNumber ? "is-invalid" : ""
                }`}
                name="phoneNumber"
                placeholder="Phone Number"
                value={dataForm.phoneNumber}
                onChange={handleChange}
              />
              {formErrors.phoneNumber && (
                <div className="text-danger">{formErrors.phoneNumber}</div>
              )}
              {/* Role */}
              <select
                className={`modal-input form-select mb-2 text-white rounded-3 border-0 ${
                  formErrors.role ? "is-invalid" : ""
                }`}
                name="role"
                value={dataForm.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
              {formErrors.role && (
                <div className="text-danger">{formErrors.role}</div>
              )}
              {/* Mot de Passe */}
              <input
                type="password"
                className={`modal-input form-control mb-2 text-white rounded-3 border-0 ${
                  formErrors.password ? "is-invalid" : ""
                }`}
                name="password"
                placeholder="Password"
                value={dataForm.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="text-danger">{formErrors.password}</div>
              )}
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
                    className="form-control input-creer-admin"
                    placeholder="John"
                    value={adminChoisi ? adminChoisi.name : ""}
                    onChange={(e) =>
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Nom famille (lastName) */}
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control input-creer-admin"
                    placeholder="Doe"
                    value={adminChoisi ? adminChoisi.lastName : ""}
                    onChange={(e) =>
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control input-creer-admin"
                  placeholder="example@gmail.com"
                  value={adminChoisi ? adminChoisi.email : ""}
                  onChange={(e) =>
                    setAdminChoisi((prevAdmin) => ({
                      ...prevAdmin,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              {/* # telephone */}
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control  input-creer-admin"
                  placeholder="514-123-1234"
                  value={adminChoisi ? adminChoisi.phoneNumber : ""}
                  onChange={(e) =>
                    setAdminChoisi((prevAdmin) => ({
                      ...prevAdmin,
                      phoneNumber: e.target.value,
                    }))
                  }
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
                    className="form-control  text-center input-creer-admin"
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
                    className="form-control text-center input-creer-admin"
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
                    className="form-control  text-center input-creer-admin"
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
                    className="form-select input-creer-admin"
                    value={adminChoisi ? adminChoisi.role : ""}
                    onChange={(e) =>
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        role: e.target.value,
                      }))
                    }
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
                  className="btn text-white rounded-2 w-25 btn-save-admin"
                  onClick={handleUpdateSave}
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
