import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthService from "../services/AuthService";

const Activate = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const verify = (e) => {
    e.preventDefault();
    AuthService.verify(uid, token)
      .then(() => {
        setSentEmail(true);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {/* sign in form */}
          <div>
            <h1 className="title">Verify your Account</h1>
            <button
              onClick={(e) => verify(e)}
              type="button"
              className="btn-l solid"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel"></div>
      </div>
    </div>
  );
};

export default Activate;
