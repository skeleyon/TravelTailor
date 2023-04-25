import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";
import AuthService from "../services/AuthService";
import "../assets/css/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(
    localStorage.getItem("access") ? localStorage.getItem("access") : ""
  );
  const [refresh, setRefresh] = useState(
    localStorage.getItem("refresh") ? localStorage.getItem("refresh") : ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const[ user, setUser] = useState({});

  const googleSignIn = () => {
    axios
      .get(
        `http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/booking`
      )
      .then(
        (response) => {
          window.location.replace(response.data.authorization_url);
        },
        (error) => {}
      );
  };

  const fbSignIn = () => {
    axios
      .get(
        `http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/booking`
      )
      .then(
        (response) => {
          window.location.replace(response.data.authorization_url);
        },
        (error) => {}
      );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(email, password).then(
      (response) => {
        if (response.type == "LOAD_USER_SUCCESS") {
          setIsAuthenticated(true);
          setUser(response.user);
          navigate("/explore");
        } else {
          setIsAuthenticated(false);
        }
      },
      (error) => {
        // yayuan ek message hoga okok
        // var obj = error.response.data
        // var vals = Object.keys(obj).map(key => obj[key]);
        // const resMessage = vals[0]
        // this.setState({
        //   message: resMessage
        // });
      }
    );
  };

  return (
    <>
      {" "}
      <div className="container" id="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/* sign in form */}
            <Form
              onSubmit={handleLogin}
              className="lform sign-in-form"
            >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <FontAwesomeIcon icon={["fas", "envelope"]} size="lg" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={["fas", "lock"]} size="lg" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  minLength="8"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-l solid">
                Login
              </button>
              <p className="social-text">
                Did you forget your password?{" "}
                <Link
                  className="link"
                  style={{ color: "blue" }}
                  to="/reset-password"
                >
                  Reset Password
                </Link>
              </p>
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon-l">
                  <FontAwesomeIcon
                    icon={["fab", "facebook"]}
                    onClick={()=>fbSignIn()}
                  />
                </a>
                <a href="#" className="social-icon-l">
                  <FontAwesomeIcon
                    icon={["fab", "google"]}
                    onClick={()=>googleSignIn()}
                  />
                </a>
              </div>
            </Form>
            {/* signup form */}
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>"Discover the world, we'll handle the rest"</p>
              
                <Link className="link" to="/register">
                <button className="btn-l transparent" id="sign-up-btn">
                  Sign Up
                  </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
