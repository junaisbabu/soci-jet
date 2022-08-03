import React, { useEffect, useState } from "react";
import Header from "../components/containers/header/Header";
import PostsBookMarkedActivities from "../components/containers/post bookmark activities/PostsBookmarkedActivities";
import Bookmarks from "../components/containers/post bookmark activities/Bookmarks";
import PostsActivities from "../components/containers/post bookmark activities/PostsActivities";
import { useParams } from "react-router-dom";
import firestoreSevice from "../firebase/firebaseFirestore";
import ProfileComponent from "../components/containers/profile/ProfileComponent";
import { useSelector } from "react-redux";
import Spinner from "../components/loading spinner/Spinner";
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
  }, [profileid]);

  return (
    <>
      <Header />
      {profile ? (
        <div className="col-xs-10 col-sm-8 col-md-7 col-lg-5 mx-auto">
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
            <Bookmarks currentUserId={currentUser.id} />
          ) : (
            <PostsActivities profileid={profileid} />
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
