import { Link } from 'react-router-dom';
import imageFilm from "../assets/imageFilm.jpg";


const BodyAccueil = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(25, 41, 124, 1) 50%, rgba(0,0,0,1) 100%)",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        className="container-fluid text-white"
        style={{
          maxWidth: "900px",
          textAlign: "left",
        }}
      >
        <h1
          className="fw-bold"
          style={{ fontSize: "2.3rem", marginBottom: "50px" }}
        >
          <span style={{ fontWeight: "900" }}>
            Make every film you watch part of your story
          </span>
        </h1>
        <div className="row align-items-start">
          <div className="col-md-7">
            <p
              className="lead text-start"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "10px",
              }}
            >
              Sometimes, you watch a movie that connects so deeply within you
              that you can’t stop thinking about it. You need to talk about it,
              analyze it—you’re just not ready to say goodbye yet. Or sometimes,
              it’s so bad that you can’t help but express how terrible it was.
              That’s what FilmBox is for. Rate your movies, leave an impression,
              write down your thoughts, and express your emotions one last time
              before cutting the final scene for good.
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginTop: "20px",
              }}
            >
              It’s also a way to revisit old movies you’ve watched and relive
              the emotions you experienced during them. Whether it’s nostalgia,
              awe, or frustration, it’s all part of your cinematic journey.
            </p>
          </div>

          <div className="col-md-5 d-flex justify-content-center">
            {" "}
            {/** Image */}
            <div
              className="image-container"
              style={{
                textAlign: "center",
                maxWidth: "65%",
                alignSelf: "flex-start",
                marginTop: "-10px",
              }}
            >
              <img
                src={imageFilm}
                alt="Film Experience"
                className="img-fluid rounded"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {" "}
          {/** texte du bas */}
          <div className="col text-start ">
            <p
              className="fw-bold mt-3 text-center"
              style={{ fontSize: "1.2rem" }}
            >
              <b>For Every Movie That Moves You—Share Your Final Scene.</b>
            </p>
            <p
              className="fw-bold mt-1 text-center"
              style={{ fontSize: "1.2rem" }}
            >
              It’s simple: just watch it, feel it, and rate it!
            </p>
          </div>
        </div>

        <div className="mt-5 text-center">
          <h1 className="mb-5 fw-bold">Coming Soon: Your Future Favorites</h1>
          <div class="row justify-content-center mb-5">
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <h1 className="mb-5 fw-bold">Lights, Camera, Oscar!</h1>
          <div class="row justify-content-center mb-5">
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div class="col-3">
              <div
                className="image-container"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={imageFilm}
                  alt="Film Experience"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          {" "}
          {/** FAQ */}
          <h2 className="fw-bold mb-4">Frequently asked questions</h2>
          <div className="faq-container mx-auto" style={{ maxWidth: "600px" }}>
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
                question: "Can I rate and comment on the movies I’ve watched?",
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
                  className="w-100 d-flex justify-content-between align-items-center p-3 border-0 rounded"
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
                      color: "#2978A0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer d-none p-3 rounded"
                  style={{
                    backgroundColor: "#141A30",
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
    </div>
  );
}

export default BodyAccueil;
