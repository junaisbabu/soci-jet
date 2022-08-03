import React, { useContext } from "react";
import "./feedPost.css";
import { useSelector } from "react-redux";
import Post from "./Post";

function FeedPost() {
  const posts = useSelector((state) => state.addedPosts);

  const feedPostStyle = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <>
      <div className="feedPost-container">
        {posts &&
          posts.map((post) => {
            return <Post key={post.docId} post={post} styles={feedPostStyle} />;
          })}
      </div>
    </>
  );
}

export default FeedPost;
