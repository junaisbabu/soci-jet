import React, { useState } from "react";
import "./profile.css";
import Junais from "../../../images/avatar/Junais Babu.jpg";
import { useNavigate, Link } from "react-router-dom";
import EditProfile from "../edit profile/EditProfile";
import { userSignOut } from "../../../firebase/firebaseAuth";
import { useSelector } from "react-redux";


function Profile() {
  const [editStatus, setEditStatus] = useState(false);

  const user = useSelector((state) => state.loggedUser.currentUser);


  const navigate = useNavigate();

  const handleEditProfile = () => {
    setEditStatus(!editStatus);
  };

  const handleLogOut = async () => {
    try {
      await userSignOut();
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <>
      {editStatus && (
        <EditProfile setEditStatus={setEditStatus} editStatus={editStatus} />
      )}
      <div className="profile-container col-xs-10 col-sm-8 col-md-7 col-lg-5">
        <div className="card">
          <div className="card-body d-flex justify-content-around">
            <section className="sec-left">
              <img src={user.photoURL} />
            </section>
            <section className="sec-right">
              <div className="d-flex align-items-center">
                <h4 className="name">{user.displayName}</h4>
                <button
                  className="edit-profile-btn btn btn-sm btn-outline-warning"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
              <span>@junais</span>
              <p>Aspiring Software Developer</p>
              <Link to="www.junais.com">www.junais.com</Link>

              <div className="counter-container my-1">
                <span>6 posts</span>
                <span>2 followers</span>
                <span>2 following</span>
              </div>

              <button
                className="btn logout-btn btn-sm btn-danger col-8"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
