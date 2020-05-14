import React from 'react'
import {
  Image
} from "react-bootstrap";
import "./Logo.css"

const logo = require("../logo/logo.png");

const Logo = (props) => {
  return (
    <div>
      <Image src={logo} className="logo" fluid/>
    </div>
  );
}

export default Logo;