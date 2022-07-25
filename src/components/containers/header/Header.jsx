import React from "react";
import './header.css'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.loggedUser.currentUser);

  return (
    <nav className="navbar ">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 "><i class="bi bi-yelp"></i> SociJet</span>

        <ul className="navbar-nav">
            <li className="nav-item"><i className="bi bi-search-heart"></i></li>
            <li className="nav-item"><i class="bi bi-circle-half"></i></li>
            <li className="nav-item"><Link to='/explore'><i class="bi bi-compass"></i></Link></li>
            <li className="nav-item"><Link to='/'><i class="bi bi-shop"></i></Link></li>
            <li className="nav-item"><Link to='/profile'><img className="user-avatar" src={user.photoURL} /></Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
