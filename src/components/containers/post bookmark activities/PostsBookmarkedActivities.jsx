import React from "react";
import { RiHeartPulseFill, RiHomeHeartFill } from "react-icons/ri";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import "./postsBookmarkedActivities.css";

function PostsBookMarkedActivities({ tab, setTab, currentUser, profileid }) {
  return (
    <div className="postBookmarkActivities-container">
      <span
        className={tab === "posts" && "clicked"}
        onClick={() => setTab("posts")}
      >
        <RiHomeHeartFill className="icon" /> POSTS
      </span>
      {profileid === currentUser && (
        <span
          className={tab === "bookmarks" && "clicked"}
          onClick={() => setTab("bookmarks")}
        >
          <BsFillBookmarkStarFill className="icon" />
          BOOKMARKED
        </span>
      )}
      <span
        className={tab === "activities" && "clicked"}
        onClick={() => setTab("activities")}
      >
        <RiHeartPulseFill className="icon" />
        ACTIVITIES
      </span>
    </div>
  );
}

export default PostsBookMarkedActivities;
