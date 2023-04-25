import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";
import AuthService from "../services/AuthService";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const googleSignIn = () => {
    axios
      .get(
        `http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/login`
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
        `http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/login`
      )
      .then(
        (response) => {
          window.location.replace(response.data.authorization_url);
        },
        (error) => {}
      );
  };

  const handleRegister = (e) => {
    e.preventDefault();

    AuthService.signup(name, email, password, RePassword).then(
      (response) => {
        //here should be a message okok
        console.log(response);
        navigate("/login");
      },
      (error) => {
        console.log(error);
        // var obj = error.response.data
        // var vals = Object.keys(obj).map(key => obj[key]);
        // const resMessage = vals[0][0]
        // this.setState({
        //   message: resMessage
        // });
      }
    );
  };

  return (
    <div className="container" id="container">
      <div className="forms-container">
        <div className="signin-signup">
          <Form onSubmit={handleRegister} className="lform sign-ip-form">
            <h2 className="title">Sign up</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={["fas", "envelope"]} size="lg" />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                minLength="8"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={["fas", "user"]} size="lg" />
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                minLength="8"
                onChange={(e) => setName(e.target.value)}
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
            <div className="input-field">
              <FontAwesomeIcon icon={["fas", "lock"]} size="lg" />
              <Input
                type="password"
                name="RePassword"
                placeholder="Re Type Password"
                minLength="8"
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" className="btn-l" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon-l" onClick={() => fbSignIn()}>
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </a>
              <a
                href="#"
                className="social-icon-l"
                onClick={() => googleSignIn()}
              >
                <FontAwesomeIcon icon={["fab", "google"]} />
              </a>
            </div>
          </Form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>"Let us take you places"</p>
            <button className="btn-l transparent" id="sign-up-btn">
              <Link className="link" to="/login">
                Sign In
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
