import { Link } from "react-router-dom";
import imageProfil from "../assets/icone_utilisateur.png";

function AdminManagement() {
  return (
    <div
      className="bg-dark text-white min-vh-100"
      style={{
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(26, 0, 255, 1) 0%,
            rgba(5, 14, 66, 0.98) 15%,
            rgba(0, 0, 255, 0) 100%
          ),
          linear-gradient(
            180deg,
            rgba(5, 0, 50, 1) 100%,
            rgba(5, 0, 50, 1) 100%
          ),
          linear-gradient(180deg, #000000, #000000)
        `,
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
          background: "linear-gradient(to right, #02002E, #030046)",
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
      <div className="container py-4">
        <h3 className="mb-4">Admin Users Management</h3>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Internal Users"
          />
        </div>

        {/* Table */}
        <div className="table-responsive mb-3">
          <table className="table table-dark table-hover table-bordered align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Last Login</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, idx) => (
                <tr key={idx}>
                  <td colSpan="6"></td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-outline-light">Create Admin</button>
        </div>

        {/* Admin Information Form */}
        <h5 className="mb-3">Admin Information</h5>
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" placeholder="John" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder="Doe" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="514-123-1234"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Date Of Creation</label>
              <input type="date" className="form-control" />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <select className="form-select">
              <option>Choose...</option>
              <option>Admin</option>
              <option>Moderator</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminManagement;
