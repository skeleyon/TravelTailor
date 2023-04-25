import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";

import hero from "../../assets/hero-banner.png";
import colo from "../../assets/top-attractions-in-the-world-italy-rome-colosseum.jpg";
import flower from "../../assets/world-tourist-attractions-eiffel-tower-flowers-spring.jpg";
import ny from "../../assets/usa-best-places-new-york.jpg";
import picchu from "../../assets/top-attractions-in-the-world-peru-machu-picchu-overview.jpg";
import tnw from "../../assets/tnw.png";
import bi from "../../assets/bizinsider.png";
import mash from "../../assets/mashable.png";
import tc from "../../assets/techcrunch.png";
import "./homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faBullseye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button, Carousel } from "react-bootstrap";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {
  return (
    <>
      <div className="Application">
        <div className="colored-section" id="title">
          {/* Navigation bar */}
          <NavBar />
          {/* main content with buttons */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <h6 className="explore">Explore Your Travel.</h6>
                <h1 className="big-heading">Trusted Travel Agency.</h1>
                <p className="home-p" id="copyright">
                  I travel not to go anywhere, but to go. I travel for travel's
                  sake the great affair is to move.
                </p>
                <button
                  type="button"
                  className="btn btn-dark btn-lg download-button"
                >
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-lg download-button"
                >
                  <Link className="link" to="/register">
                    Sign Up
                  </Link>
                </button>
              </div>

              <div className="col-lg-6">
                <img className="title-image" src={hero} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* White section */}
        <div className="white-section" id="features">
          <div className="container-fluid">
            <div className="row">
              <div className="feature-box col-lg-4">
                <FontAwesomeIcon className="fa-4x m-3" icon={faCheckCircle} />
                <h3 className="feature-title">Tour Guide.</h3>
                <p className="home-p">
                  {" "}
                  Travel like a local with our expert guide!
                </p>
              </div>

              <div className="feature-box col-lg-4">
                <FontAwesomeIcon className="fa-4x m-3" icon={faBullseye} />
                <h3 className="feature-title">Friendly Price</h3>
                <p className="home-p">
                  {" "}
                  Experience the best without breaking the bank!
                </p>
              </div>

              <div className="feature-box col-lg-4">
                <FontAwesomeIcon className="fa-4x m-3" icon={faHeart} />
                <h3 className="feature-title">Reliable Tour.</h3>
                <p className="home-p">
                  {" "}
                  Discover the world's best with a reliable tour company!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* carousel section */}

        <Carousel interval={10000} indicators={false}>
          <Carousel.Item>
            <div className="d-flex flex-column justify-content-around">
              <h2 className="testimonial-text">
                "The Colosseum is a masterpiece of ancient architecture, a
                testament to the incredible skills of the Romans, and a symbol
                of the glory and power of the Roman Empire."{" "}
              </h2>
              <div className="d-flex justify-content-around">
                <img
                  className="testimonial-image"
                  src={colo}
                  alt="lady-profile"
                />
              </div>

              <em className="h1">Colosseum, Rome</em>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex flex-column justify-content-around">
              <h2 className="testimonial-text">
                "The Eiffel Tower is a reminder of the beauty and elegance of
                French architecture, a tribute to the history and culture of
                Paris, and a marvel of modern engineering."
              </h2>
              <div className="d-flex justify-content-around">
                <img
                  className="testimonial-image"
                  src={flower}
                  alt="lady-profile"
                />
              </div>

              <em className="h1">Eiffel Tower, Paris</em>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex flex-column justify-content-around">
              {" "}
              <h2 className="testimonial-text">
                "The Statue of Liberty is a tribute to the courage,
                determination, and strength of the American people. She is a
                testament to the values that make America great."
              </h2>
            </div>
            <div className="d-flex justify-content-around">
              {" "}
              <img className="testimonial-image" src={ny} alt="lady-profile" />
            </div>

            <em className="h1">New York, United States Of America</em>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex flex-column justify-content-around">
              <h2 className="testimonial-text">
                My dog used to be so lonely, but with TinDog's help, they've
                found the love of their life. I think.
              </h2>
              <div className="d-flex justify-content-around">
                {" "}
                <img
                  className="testimonial-image"
                  src={picchu}
                  alt="lady-profile"
                />
              </div>

              <em className="h1">Macha Pichu, Peru</em>
            </div>
          </Carousel.Item>
        </Carousel>

        <div className="colored-section" id="press">
          <img className="press-logo" src={tnw} alt="tnw-logo" />
          <img className="press-logo" src={bi} alt="biz-insider-logo" />
          <img className="press-logo" src={mash} alt="mashable-logo" />
          <img className="press-logo" src={tc} alt="techcrunch-logo" />
        </div>

        <div className="colored-section" id="cta">
          <div className="container-fluid">
            <h3 className="big-heading">
              Plan your perfect trip with ease - Download our app today!.
            </h3>
            <Button className="px-4 py-2" variant="dark">
              <FontAwesomeIcon className="px-2" icon={faApple} />
              Download
            </Button>

            <Button className="px-4 py-2 ms-3" variant="outline-dark">
              <FontAwesomeIcon className="px-2" icon={faGooglePlay} />
              Download
            </Button>
          </div>
        </div>
        <footer className="bg-light text-center text-white">
          <div className="p-4 pb-0">
            <div className="mb-4">
              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#dd4b39" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#ac2bac" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#0082ca" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#333333" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="text-center p-3">
            © 2023 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">
              MDBootstrap.com
            </a>
          </div>
          <p className="home-p" id="copyright">
            © Copyright 2023 TravelTailor
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
