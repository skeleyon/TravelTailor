import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";
import AuthService from "../services/AuthService";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  function handleReset(e) {
    AuthService.resetPassword(email)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        alert("Password reset email was successfully sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {" "}
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <Form onSubmit={handleReset} className="lform sign-in-form">
              <h2 className="title">Password Reset</h2>
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

              <button type="submit" className="btn-l solid">
                Reset Password
              </button>

              {success && (
                <div className="form-group">
                  <div role="alert">
                    <span style={{ color: "green" }}>
                      Password reset email was successfully sent
                    </span>
                  </div>
                </div>
              )}
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
