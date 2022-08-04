import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import PostsBookMarkedActivities from "../components/post bookmark activities/PostsBookmarkedActivities";
import Bookmarks from "../components/post bookmark activities/Bookmarks";
import PostsActivities from "../components/post bookmark activities/PostsActivities";
import { useParams } from "react-router-dom";
import firestoreSevice from "../firebase/firebaseFirestore";
import ProfileComponent from "../components/profile/ProfileComponent";
import { useSelector } from "react-redux";
import Loading from "../components/loading spinner/Loading";

function ProfilePage() {
  const [tab, setTab] = useState("posts");
  // const [editStatus, setEditStatus] = useState(false);

  const currentUser = useSelector((state) => state.loggedUser.currentUser);

  const { profileid } = useParams();
  const [profile, setProfile] = useState();

  const getUserProfile = async () => {
    const docSnap = await firestoreSevice.getDocument("users", profileid);
    setProfile(docSnap.data());
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const profilePostStyles = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <>
      <Header />
      {profile ? (
        <div className="col-sm-10 col-md-7 col-lg-5 mx-auto">
          <div className="profile-container">
            <ProfileComponent
              user={profile}
              setUser={setProfile}
              currentUser={currentUser.id}
            />
          </div>
          <PostsBookMarkedActivities
            profileid={profileid}
            currentUser={currentUser.id}
            tab={tab}
            setTab={setTab}
          />
          {tab === "bookmarks" ? (
            <Bookmarks
              styles={profilePostStyles}
              currentUserId={currentUser.id}
            />
          ) : (
            <PostsActivities styles={profilePostStyles} profileid={profileid} />
          )}
        </div>
      ) : (
        <div
          className="spinner-body d-flex align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <Loading />
        </div>
      )}
    </>
  );
}

export default ProfilePage;
