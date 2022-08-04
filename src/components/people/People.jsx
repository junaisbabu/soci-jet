import React, { useEffect, useState } from "react";
import "./people.css";
import firestoreSevice from "../../firebase/firebaseFirestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function People() {
  const [fUsers, setFUsers] = useState([]);
  // const [follower, setFollower] = useState([]);
  const users = useSelector((state) => state.addedUsers.users);
  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const following = useSelector((state) => state.followingUsers);
  // const followers = useSelector((state) => state.followers);
  const navigate = useNavigate();

  const navigateProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const getFollowingUsers = () => {
    return following
      .filter((item) => {
        return item.docId === currentUser.id;
      })
      .map((item) => {
        return item.following;
      });
  };
  const [follow] = getFollowingUsers();
  let followingUsers = follow;

  useEffect(() => {
    if (followingUsers) setFUsers(followingUsers);
  }, []);

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  }

  const handleFollow = async (user) => {
    let copy = fUsers.slice();

    // if (!copy.includes(user.name)) {
    copy.push(user);
    await firestoreSevice.setDocument("following", currentUser.id, {
      following: copy,
    });
    // }

    setFUsers(copy);
  };

  return (
    <div className="people-container">
      <div className="row">
        {users &&
          getDifference(users, fUsers).map((user) => {
            if (user.id !== currentUser.id)
              return (
                <div key={user.id} className="card">
                  <div
                    className="card-body"
                    onClick={() => {
                      navigateProfile(user.id);
                    }}
                  >
                    <div className="card-img-container">
                      <img
                        className="card-img-top"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <span className="card-title">{user.name}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="card-text follow-btn"
                      onClick={() => {
                        handleFollow(user);
                      }}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default People;
