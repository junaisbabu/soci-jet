import React from "react";
import "./explore.css";
import People from "../../containers/people/People";
import FeedPost from "../feed post/FeedPost";
import Header from "../header/Header";

function Explore() {
  return (
    <>
      <Header />
      <div className="col-xs-10 col-sm-8 col-md-7 col-lg-5 mx-auto">
        <People />
        <FeedPost />
      </div>
    </>
  );
}

export default Explore;
