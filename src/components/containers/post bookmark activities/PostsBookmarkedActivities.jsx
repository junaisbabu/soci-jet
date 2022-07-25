import React from "react";
import "./postsBookmarkedActivities.css";

function PostsBookMarkedActivities() {
  return (
    <div className="postBookmarkActivities-container col-xs-10 col-sm-8 col-md-7 col-lg-5">
      <section className="posts">
        <span><i class="bi bi-house-heart"></i> POSTS</span>
      </section>
      <section className="bookmarked">
        <span><i class="bi bi-bookmark-star"></i> BOOKMARKED</span>
      </section>
      <section className="activities">
        <span><i class="bi bi-heart-pulse"></i> ACTIVITIES</span>
      </section>
    </div>
  );
}

export default PostsBookMarkedActivities;
