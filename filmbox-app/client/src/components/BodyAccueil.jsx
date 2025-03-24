import { Link } from "react-router-dom";
import imageFilm from "../assets/imageFilm.jpg";
import imageLogo from "../assets/logo_FilmBox.png";
import fondAffiches from "../assets/titanic.png"; //
 
function BodyAccueil() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgb(0, 0, 0) 0%, rgb(50, 6, 98) 45%, rgb(0, 0, 0) 100%)",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div
          className=""
          style={{
            width: "100%",
            paddingTop: "40px",
            backgroundColor: "black",
            backgroundImage: `url(${fondAffiches})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/**Bouton Connexion */}
          <nav className="position-absolute top-0 end-0 p-3">
            <Link
              to="/connexion"
              className="nav-link active text-white text-"
              style={{ fontSize: "20px" }}
            >
              CONNEXION
            </Link>
          </nav>
 
          {/* Logo */}
          <img
            src={imageLogo}
            className="img-fluid position-absolute top-0 start-0 mt-2 ms-2"
            alt="image-logo"
            style={{ width: "100px", height: "auto" }}
          />
 
          <div className="d-flex flex-column align-items-center w-100 text-center mt-5">
            <div className="w-100 mb-4 px-5 " style={{ marginTop: "300px" }}>
              <div className="d-flex align-items-center w-100">
                {/* Premier texte */}
                <h1
                  className="text-white fw-bold mb-0 text-start me-1"
                  style={{
                    fontFamily: "'Jomhuria', sans-serif",
                    fontSize: "70px",
                  }}
                >
                  COLLECT MEMORIES
                </h1>
                {/** Ligne separation */}
                <div className="flex-grow-1 border-top border-light border-light border-2 w-25 ms-3" />
              </div>
              {/* Deuxieme texte */}
              <div className="my-3" />
 
              <div className="d-flex align-items-center w-100">
                <div
                  className="border-top border-2 border-light flex-grow-1 me-auto"
                  style={{ width: "30%" }}
                />
                <h1
                  className="text-white fw-bold mb-0 ms-3 text-nowrap"
                  style={{ minWidth: "250px" }}
                >
                  ONE MOVIE AT A TIME
                </h1>
              </div>
            </div>
            {/* Bouton pour se connecter */}
            <div className="d-flex justify-content-start w-100">
              <button className="btn custom-btn text-light fw-light fs-4 mb-4">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
        {/**Texte du bas */}
        <div>
          <div className="text-center text-light mt-3">
            <span className="fw-bold fs-3">
              Make every film you watch part of your story
            </span>
          </div>
          {/**Gros paragraphes */}
          <div className="text-white container text-center mt-4 d-flex flex-column align-items-center">
            <div
              className="row align-items-start w-100"
              style={{ maxWidth: "1300px" }}
            >
              <div className="col-md-7 text-md-start">
                <p className="lead mb-2 fs-6 lh-lg">
                  Sometimes, you watch a movie that connects so deeply within
                  you that you can’t stop thinking about it. You need to talk
                  about it, analyze it—you’re just not ready to say goodbye yet.
                  Or sometimes, it’s so bad that you can’t help but express how
                  terrible it was. That’s what FilmBox is for. Rate your movies,
                  leave an impression, write down your thoughts, and express
                  your emotions one last time before cutting the final scene for
                  good.
                </p>
 
                <p className="fs-6 lh-lg mt-3">
                  It’s also a way to revisit old movies you’ve watched and
                  relive the emotions you experienced during them. Whether it’s
                  nostalgia, awe, or frustration, it’s all part of your
                  cinematic journey.
                </p>
                {/**Les quotes pour le site */}
                <div className="row mt-3">
                  <div className="col text-center text-light">
                    <p className="fw-bold fs-5 mt-3">
                      <b>
                        For Every Movie That Moves You-Share Your Final Scene.
                      </b>
                    </p>
                    <p className="fw-bold fs-5 mt-1">
                      It's simple: just watch it, feel it, and rate it!
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Image a droite */}
              <div className="col-md-5 d-flex justify-content-center">
                <div className="text-center w-50">
                  <img
                    src={imageFilm}
                    alt="Film Experience"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
 
          {/**Les films a venir */}
          <div className="mt-5 text-center text-light">
            <h1 className="mb-5 fw-bold">Coming Soon: Your Future Favorites</h1>
            {/**les images dans un tableau */}
            <div
              className="row justify-content-center mb-5"
              style={{ padding: "40px" }}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  className="col-6 col-md-3 d-flex justify-content-center"
                  key={index}
                >
                  <img
                    src={imageFilm}
                    alt="Film random"
                    className="img-fluid  w-100"
                  />
                </div>
              ))}
            </div>
          </div>
          {/**Les films des Oscars */}
          <div className="mt-5 text-center text-light">
            <h1 className="mb-5 fw-bold">Lights, Camera, Oscar!</h1>
            {/**les images dans un tableau */}
            <div
              className="row justify-content-center mb-5"
              style={{ padding: "40px" }}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  className="col-6 col-md-3 d-flex justify-content-center"
                  key={index}
                >
                  <img
                    src={imageFilm}
                    alt="Film random"
                    className="img-fluid  w-100"
                  />
                </div>
              ))}
            </div>
          </div>
          {/**Les questions */}
          <div className="mt-5 text-center text-light">
            {" "}
            {/** FAQ */}
            <h2 className="fw-bold mb-4">Frequently asked questions</h2>
            <div
              className="faq-container mx-auto"
              style={{ maxWidth: "800px" }}
            >
              {[
                {
                  question: "What is FilmBox?",
                  answer:
                    "FilmBox is a platform that lets you rate, review, and track the movies you watch.",
                },
                {
                  question: "How much does a FilmBox subscription cost?",
                  answer:
                    "FilmBox offers both free and premium plans. Pricing details are available on our website.",
                },
                {
                  question: "Are my lists and comments public or private?",
                  answer:
                    "You can set your lists and comments to be either public or private in your settings.",
                },
                {
                  question:
                    "Can I rate and comment on the movies I’ve watched?",
                  answer:
                    "Yes! FilmBox allows you to rate movies, leave comments, and share your thoughts.",
                },
                {
                  question:
                    "Is there a limit to the number of movies I can save?",
                  answer:
                    "There is no limit on saved movies for premium users. Free users have a limit of 100 movies.",
                },
              ].map((faq, index) => (
                <div key={index} className="faq-item mb-3">
                  <button
                    className="w-100 d-flex justify-content-between align-items-center p-3 border-0 "
                    style={{
                      backgroundColor: "#141A30",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "light",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      document
                        .getElementById(`faq-answer-${index}`)
                        .classList.toggle("d-none");
                      document
                        .getElementById(`faq-icon-${index}`)
                        .classList.toggle("rotate");
                    }}
                  >
                    {faq.question}
                    <span
                      id={`faq-icon-${index}`}
                      className="faq-icon"
                      style={{
                        transition: "transform 0.3s",
                        color: "#657ED4",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer d-none p-3 "
                    style={{
                      backgroundColor: "#657ED4",
                      fontSize: "16px",
                      textAlign: "left",
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* KEEP EVERYTHING ABOVE THIS COMMENT */}
      </div>
    </div>
  );
}
 
export default BodyAccueil;
 
 