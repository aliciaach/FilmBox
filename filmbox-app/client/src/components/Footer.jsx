import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <footer
      className="footer mt-auto py-4 bg-black text-light"
      style={{ 
        background: `linear-gradient(to bottom,
                            rgb(6, 0, 63),
                            rgb(0, 0, 0))`,
        fontSize: "10px" 
      }}
    >
      <div className="container">
        <div className="row text-center">
          <hr className="my-3 border-light" />
          <div className="col-md-4 text-center  ">
            <h6>Suivez-nous</h6>
            <ul className="list-unstyled text-center">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Youtube
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Tiktok
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-center">
            <h6>Account</h6>
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
            <h6>Gestion</h6>
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
