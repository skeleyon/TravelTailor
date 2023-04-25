import React, { Component, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";
import AuthService from "../services/AuthService";

function ResetPasswordConfirm() {
  const params = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

  const handleReset = () => {
    AuthService.resetPasswordConfirm(
      params.uid,
      params.token,
      password,
      RePassword
    )
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {" "}
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/* sign in form */}
            <Form
              action="#"
              onSubmit={handleReset}
              className="lform sign-in-form"
            >
              <h2 className="title">Password Reset confirm</h2>
              <div className="input-field">
                <FontAwesomeIcon icon={["fas", "lock"]} size="lg" />
                <Input
                  type="password"
                  name="password"
                  placeholder="New Password"
      
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={["fas", "lock"]} size="lg" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Re-Type New Password"

                  minLength="6"
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-l solid">
                Confirm
              </button>


            </Form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel"></div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordConfirm;
