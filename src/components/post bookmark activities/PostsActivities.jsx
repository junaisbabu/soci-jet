import React from "react";
import { useSelector } from "react-redux";
import Post from "../feed post/Post";
import "../feed post/feedPost.css";

function PostsActivities({ profileid, styles }) {
  const posts = useSelector((state) => state.addedPosts);
  const currentUser = useSelector((state) => state.loggedUser.currentUser);

  const {id} = currentUser;
  return (
    <div className="feedPost-container">
      {posts &&
        posts.map((post) => {
          if (post.userId === profileid)
            return <Post key={post.docId} post={post} userId={id} styles={styles} />;
        })}
    </div>
  );
}

export default PostsActivities;
