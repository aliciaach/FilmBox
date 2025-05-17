import { Link } from "react-router-dom";
import img1 from "../assets/mid90s.jpg";
import img2 from "../assets/imageFilm.jpg";
import image1 from "../assets/Avatar_Fire.png";
import image2 from "../assets/captain_america.png";
import image3 from "../assets/Jurassic_World.png";
import image4 from "../assets/the-gorge.jpg";
import image5 from "../assets/boy-heron.jpg";
import image6 from "../assets/oppenheimer.png";
import image7 from "../assets/maestro.png";
import image8 from "../assets/may-december.jpg";
import imageLogo from "../assets/logo_FilmBox.png";
import fondAffiches from "../assets/AffichesNOIRR.png";

const imagesVenir = [image1, image2, image3, image4];
const oscars = [image5, image6, image7, image8];

function BodyAccueil() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgb(5, 14, 66) 15%, rgb(5, 14, 66) 30%, rgb(0, 0, 0) 70%, rgb(5, 0, 50) 100%)",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
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
            minHeight: "150vh",
            backgroundColor: "black",
            backgroundImage: `url(${fondAffiches})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            //backgroundAttachment: "fixed",
          }}
        >
          {/**Bouton Connexion */}
          <nav className="position-absolute top-0 end-0 p-3">
            <Link
              to="/connexion"
              className="nav-link active text-white text-"
              style={{ fontSize: "20px" }}
            >
              <button className="btn custom-btn text-light fw-light fs-4 mt-2">
                CONNEXION
              </button>
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
                  className="text-white mb-0 text-start me-1"
                  style={{
                    fontFamily: "Jomhuria",
                    minWidth: "250px",
                    fontSize: "90px",
                    letterSpacing: "1px",
                  }}
                >
                  COLLECT MEMORIES
                </h1>
                {/** Ligne separation */}
                <div className="flex-grow-1 border-top border-light border-light border-2 w-25 ms-3" />
              </div>
              {/* Deuxieme texte */}
              <div className="my-4" />

              <div className="d-flex align-items-center w-100 mb-2">
                <div
                  className="border-top border-2 border-light "
                  style={{ width: "20%" }}
                />
                <h1
                  className="text-white mb-0 ms-5"
                  style={{
                    fontFamily: "Jomhuria",
                    minWidth: "250px",
                    fontSize: "90px",
                    letterSpacing: "1px",
                  }}
                >
                  ONE MOVIE AT A TIME
                </h1>
              </div>
            </div>
            {/* Bouton pour se connecter */}
            <div className="d-flex justify-content-start w-100">
              <Link to="/inscription" className="ms-3 mt-5 mb-4">
                <button className="btn custom-btn text-light fw-light fs-4">
                  GET STARTED
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/**Texte du bas */}
        <div>
          <div className="d-flex flex-column align-items-center text-center mt-4 text-white">
            <div style={{ width: "100%", marginLeft: "150px" }}>
              {/** grande affirmation */}
              <div className="text-light mt-5 text-start w-100 ms-5 mb-5">
                <span
                  className="fw-bold"
                  style={{ fontSize: "7.8vh" }} /* 50px*/
                >
                  Make every film you watch part of your story
                </span>
              </div>

              {/**Gros paragraphes */}
              <div className="row align-items-start w-100 mt-4 ">
                {/* texte */}
                <div className="col-md-8 text-md-start">
                  <p
                    className="fs-4 lh-lg mb-5 mt-3"
                    style={{ fontWeight: "400" }}
                  >
                    Sometimes, you watch a movie that connects so deeply within
                    you that you can’t stop thinking about it. You need to talk
                    about it, analyze it — you’re just not ready to say goodbye
                    yet. Or sometimes, it’s so bad that you can’t help but
                    express how terrible it was. That’s what FilmBox is for.
                    Rate your movies, leave an impression, write down your
                    thoughts, and express your emotions one last time before
                    cutting the final scene for good.
                  </p>

                  <p className="fs-4 lh-lg mb-5" style={{ fontWeight: "400" }}>
                    It’s also a way to revisit old movies you’ve watched and
                    relive the emotions you experienced during them. Whether
                    it’s nostalgia, awe, or frustration, it’s all part of your
                    cinematic journey.
                  </p>
                </div>

                {/* Image a droite */}
                <div className="col-md-4 d-flex justify-content-center align-self-start mt-4">
                  <img
                    src={img1}
                    alt="Film Experience"
                    className="img-fluid"
                    style={{
                      height: "65vh",
                      width: "auto",
                      marginRight: "100px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/**Les quotes pour le site */}
            <div className="text-center text-light mt-5">
              <p className="fw-bold fs-2" style={{ whiteSpace: "nowrap" }}>
                <b>For Every Movie That Moves You — Share Your Final Scene.</b>
              </p>
              <p className="fw-bold fs-2" style={{ marginBottom: "8vh" }}>
                It’s simple: just watch it, feel it, and rate it!
              </p>
            </div>
          </div>

          {/** Ligne séparatrice */}
          <div className="w-100 d-flex justify-content-center my-5">
            <div
              style={{
                width: "60%",
                height: "1.5px",
                background:
                  "linear-gradient(to right,rgba(101, 127, 212, 0.60), rgb(255, 255, 255),rgb(101, 126, 212, 0.60))",
                opacity: 0.3,
                borderRadius: "1px",
              }}
            />
          </div>

          {/**Les films a venir */}
          <div
            className="mt-5 text-center text-light"
            style={{ paddingTop: "10vh" }}
          >
            <h1 className="mb-5 fw-bold">Coming Soon: Your Future Favorites</h1>
            {/**les images dans un tableau */}
            <div
              className="d-flex justify-content-between align-items-start"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "1200px",
              }}
            >
              {imagesVenir.map((src, index) => (
                <div
                  className="col-6 col-md-3 d-flex justify-content-center mb-4"
                  key={index}
                >
                  <img
                    src={src}
                    alt={`Film ${index + 1}`}
                    className="img-fluid mx-2"
                    style={{ width: "90%" }}
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
              className="d-flex justify-content-between align-items-start"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "1200px",
              }}
            >
              {oscars.map((src, index) => (
                <div
                  className="col-6 col-md-3 d-flex justify-content-center mb-4"
                  key={index}
                >
                  <img
                    src={src}
                    alt={`Film ${index + 1}`}
                    className="img-fluid mx-2"
                    style={{ width: "90%" }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/**Les questions */}
          <div
            className="mt-5 text-center text-light"
            style={{ marginBottom: "15vh" }}
          >
            {" "}
            {/** FAQ */}
            <h2 className="fw-bold mb-5">Frequently asked questions</h2>
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
                    "Filmbox does not have a subscription. It is a free website for everyone.",
                },
                {
                  question: "Are my lists and comments public or private?",
                  answer:
                    "All lists and comments are private and only for the user to see.",
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
                    "There is no limit on the number of movies saved, or the comments written.",
                },
              ].map((faq, index) => (
                <div key={index} className="faq-item mb-3">
                  <button
                    className="w-100 d-flex justify-content-between align-items-center p-3 border-0"
                    style={{
                      backgroundColor: "rgb(20,26,48)",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "light",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const answer = document.getElementById(
                        `faq-answer-${index}`
                      );
                      const icon = document.getElementById(`faq-icon-${index}`);

                      answer.classList.toggle("d-none");
                      if (icon) {
                        icon.innerText = icon.innerText === "+" ? "−" : "+"; //
                      }
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
                        fontSize: "30px",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer d-none p-3 "
                    style={{
                      backgroundColor: "transparent", //"rgb(20,26,48)",
                      color: "rgb(151, 150, 150)",
                      fontSize: "16px",
                      fontFamily: "'Nunito', sans-serif", //Montserrat / Quicksand
                      fontStyle: "italic",
                      lineHeight: "1.6",
                      borderLeft: "3px solid rgb(72, 94, 164)", //35, 71, 190
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
