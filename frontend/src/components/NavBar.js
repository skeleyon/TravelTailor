import React, { Component } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
        <a className="navbar-brand px-4" href="">
          TravelTailor
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mt-2">
              <Link
                className="text-white "
                to="/"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#footer">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#testimonials">
                Destination
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#cta">
                Download
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#cta">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
