import React from "react";
import Rocket from "../../images/brand/rocket.gif";

function Nav() {
  return (
    <nav
      className="navbar"
      style={{ background: "var(--first-color)", color: "--text-color" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand mx-auto mb-0 h1 ">
          <img className="rocket-logo" src={Rocket} alt="rocket" />
          SociJet
        </span>
      </div>
    </nav>
  );
}

export default Nav;
