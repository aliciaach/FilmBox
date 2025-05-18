import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <footer
      className="footer mt-auto py-4 bg-black text-light"
      style={{ 
        background: `linear-gradient(to bottom,
                  rgba(5, 0, 50, 1), rgba(0, 0, 0, 1)) `,
        fontSize: "10px" 
      }}
    >
      <div className="container">
        <div className="row text-center">
          <hr className="my-3 border-light" />
          <div className="col-md-4 text-center  ">
            <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>Follow Us</h5>
            <ul className="list-unstyled text-center"> 
              {/*
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Youtube
                </a>
              </li>
              */}
              <li>
                {/*
                <a href="#" className="text-light text-decoration-none">
                  Instagram
                </a>*/}
                <Link
                  to="https://www.instagram.com/__filmbox__/"
                  className="text-light text-decoration-none"
                  style={{ fontSize: "16px" }}
                >
                  Instagram
                </Link>               
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-center">
            <h5 style={{ fontSize: "18px", fontWeight: "bold" }} >Account</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/inscription"
                    className="text-light text-decoration-none"
                    style={{ fontSize: "16px" }}
                  >
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connexion"
                    className="text-light text-decoration-none"
                    style={{ fontSize: "16px" }}
                  >
                    Log In
                  </Link>
                </li>
              </ul>
          </div>

          <div className="col-md-4 text-center">
            <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>Management</h5>
            <ul className="list-unstyled">
              <li>
              <Link
                    to="/AdminLogin"
                    className="text-light text-decoration-none"
                    style={{ fontSize: "16px" }}
                  >
                    Admin login
                  </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;
