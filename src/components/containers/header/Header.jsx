import React, { useContext, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../../App";
import { FiCompass } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { TbBrightnessUp, TbMoon } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useSelector((state) => state.loggedUser.currentUser);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
    <nav className="navbar sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 " onClick={navigateHome}>
          <i className="bi bi-yelp"></i> SociJet
        </span>

        <ul className="navbar-nav">
          <li className="nav-item">
            <FiSearch className="icon" />
          </li>
          <li className="nav-item" onClick={changeTheme}>
            {theme === "dark" ? (
              <TbBrightnessUp className="icon" size={"25px"} />
            ) : (
              <TbMoon className="icon" size={"25px"} />
            )}
          </li>
          <li className="nav-item">
            <Link to="/explore" className="link">
              <FiCompass size={"22px"} />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="link">
              <AiOutlineHome className="icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/profile/${user.id}`} className="link">
              <img className="user-avatar" src={user.avatar} alt={user.name} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default Header;
