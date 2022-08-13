import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userSignOut } from "../../firebase/firebaseAuth";
import EditProfile from "../modal/EditProfile";
import Followers from "../followers following/Followers";
import Following from "../followers following/Following";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { onAuth } from "../../redux/actions/Actions";

function ProfileComponent({ user, setUser, currentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [followersModal, setFollowersModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const posts = useSelector((state) => state.addedPosts);

  const following = useSelector((state) => state.followingUsers);

  const { profileid } = useParams();

  const getFollowingUsers = () => {
    return following
      .filter((item) => {
        return item.docId === profileid;
      })
      .map((item) => {
        return item.following;
      });
  };
  const follow = getFollowingUsers();
  let followingUsers = follow[0];

  const handleEditProfile = () => {
    // setEditStatus(!editStatus);
    setEditUser(true);
  };

  const handleLogOut = async () => {
    try {
      await userSignOut();
      dispatch(onAuth(""));
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  let postCount = 0;
  if (posts) {
    posts &&
      posts.map((post) => {
        if (post.userId === profileid) postCount++;
      });
  }

  return (
    <>
      {editUser && (
        <EditProfile
          setEditUser={setEditUser}
          setUser={setUser}
          show={editUser}
          onHide={() => setEditUser(false)}
        />
      )}
      {followersModal && (
        <Followers
          modalShow={followersModal}
          setModalShow={setFollowersModal}
        />
      )}
      {followingModal && (
        <Following
          followingUsers={followingUsers}
          modalShow={followingModal}
          setModalShow={setFollowingModal}
        />
      )}
      <div className="card">
        <div className="card-body">
          <section className="sec-left">
            <img src={user.avatar} alt={user.name} />
          </section>
          <section className="sec-right">
            <div className="d-flex align-items-center">
              <h4 className="name m-0">{user.name}</h4>
              {currentUser !== user.id ? (
                <button
                  className="edit-profile-btn btn btn-sm btn-outline-primary"
                  //   onClick={handleFollowUser}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="edit-profile-btn btn btn-sm btn-outline-primary"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <span>@{user.username}</span>
            <p>{user.bio}</p>
            <a href={`${user.link}`} className="website-link">
              {user.link}
            </a>

            <div className="counter-container my-1">
              <span className="clickable posts">{postCount} posts</span>
              <span
                className="clickable followers"
                onClick={() => setFollowersModal(true)}
              >
                2 followers
              </span>

              <span
                className="clickable"
                onClick={() => setFollowingModal(true)}
              >
                {follow && followingUsers ? followingUsers.length : 0} following
              </span>
            </div>

            {currentUser === user.id && (
              <button
                className="btn logout-btn btn-sm btn-danger col-8"
                onClick={handleLogOut}
              >
                Logout
              </button>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
