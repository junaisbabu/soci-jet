import React from "react";
import { useSelector } from "react-redux";
import Post from "../feed post/Post";
import "../feed post/feedPost.css";

function PostsActivities({ profileid }) {
  const posts = useSelector((state) => state.addedPosts);
  return (
    <div className="feedPost-container">
      {posts &&
        posts.map((post) => {
          if (post.userId === profileid)
            return <Post key={post.docId} post={post} />;
        })}
    </div>
  );
}

export default PostsActivities;
