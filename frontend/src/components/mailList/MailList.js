import React from "react";
import "./mailList.css";
import { Button } from "react-bootstrap";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input type="text" className="p-4" placeholder="Your Email" />
        <Button variant="primary">Subscribe</Button>
      </div>
    </div>
  );
};

export default MailList;
