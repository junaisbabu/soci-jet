import React from "react";
import "./explore.css";
import People from "../../containers/people/People";
import FeedPost from "../feed post/FeedPost";
import Header from "../header/Header";

function Explore() {
  return (
    <div className="explore-container">
      <Header />
      <People />
      <FeedPost />
    </div>
  );
}

export default Explore;
