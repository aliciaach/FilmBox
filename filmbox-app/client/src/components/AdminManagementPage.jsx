import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imageProfil from "../assets/icone_utilisateur.png";
import fondNoir from "../assets/BlackImage.png";
import trash from "../assets/trash-2-512 1.png";
import search from "../assets/search-13-512 1.png";

function AdminManagement() {
  // Code from ChatGPT
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchValue, setSearchValue] = useState("");
  //Mon code
  const [admins, setAdmins] = useState([]);
  const [adminChoisi, setAdminChoisi] = useState(null);

  const handleClickRow = (admin) => {
    setAdminChoisi(admin);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

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
  //function pour update la date (chaque fields)
  const updateDateField = (currentDate, field, value) => {
    const date = new Date(currentDate); //Va cr/er un objet Date 'a partir de la date actuelle

    switch (
      field //Va d/pendre du field 'a changer
    ) {
      case "DD":
        date.setDate(value);
        break;
      case "MM":
        date.setMonth(value - 1); //index de depart est 0 donc valeur -1 pour que ce soit la bonne
        break;
      case "YYYY":
        date.setFullYear(value);
        break;
      default:
        break;
    }

    return date.toISOString();
  };
  //Back to code from ChatGPT

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
        <div className="dropdown">
          <button
            className="btn dropdown-toggle d-flex align-items-center gap-2 border-0 bg-transparent text-white"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={imageProfil}
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
              {admins && admins.length > 0 ? (
                admins.map((admin) => (
                  <tr
                    key={admin._id}
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
            >
              Create Admin
            </button>
          </div>
        </div>

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
                    onChange={(e) => {
                      const day = e.target.value;
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        createdAt: updateDateField(
                          prevAdmin.createdAt,
                          "DD",
                          day
                        ),
                      }));
                    }}
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
                    onChange={(e) => {
                      const month = e.target.value;
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        createdAt: updateDateField(
                          prevAdmin.createdAt,
                          "MM",
                          month
                        ),
                      }));
                    }}
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
                    onChange={(e) => {
                      const annee = e.target.value;
                      setAdminChoisi((prevAdmin) => ({
                        ...prevAdmin,
                        createdAt: updateDateField(
                          prevAdmin.createdAt,
                          "YYYY",
                          annee
                        ),
                      }));
                    }}
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
                  style={{ color: "rgb(82,75,119)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white rounded-2 w-25"
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
