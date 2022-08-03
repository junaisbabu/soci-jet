import React from "react";

function Nav() {
  return (
    <nav
      className="navbar"
      style={{ background: "var(--first-color)", color: "--text-color" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand mx-auto mb-0 h1 ">
          <i className="bi bi-yelp"></i> SociJet
        </span>
      </div>
    </nav>
  );
}

export default Nav;
