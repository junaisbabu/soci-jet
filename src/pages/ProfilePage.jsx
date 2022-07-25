import React from "react";
import Header from "../components/containers/header/Header";
import PostsBookMarkedActivities from "../components/containers/post bookmark activities/PostsBookmarkedActivities";
import Profile from "../components/containers/profile/Profile";
import FeedPost from "../components/containers/feed post/FeedPost";
function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <PostsBookMarkedActivities />
      <FeedPost />
    </>
  );
}

export default ProfilePage;
