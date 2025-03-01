function Footer() {
  return (
    <footer
      className="footer mt-auto py-4 bg-black text-light"
      style={{ fontSize: "10px" }}
    >
      <div className="container">
        <div className="row text-center">
          <hr className="my-3 border-light" />
          <div className="col-md-6 text-center  ">
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

          <div className="col-md-6 text-center">
            <h6>Compte</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Créer un compte
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Se connecter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
