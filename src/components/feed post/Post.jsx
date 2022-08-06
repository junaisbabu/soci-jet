import React, { useState } from "react";
import DotMenu from "../dot menu/DotMenu";
import "./feedPost.css";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { FaRegComment } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Post({ post, styles }) {
  const navigate = useNavigate();
  const [isDotClicked, setIsDotClicked] = useState(0);
  const [deleted, setDeleted] = useState("");

  const handleComment = () => {
    navigate(`/post/${post.docId}`);
  };

  const navigateProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };
  return (
    <>
      <div key={post.docId} className="row">
        <div className="card" style={styles}>
          <div className="card-header">
            <section
              className="sec-left"
              onClick={() => navigateProfile(post.userId)}
            >
              <img src={post.userAvatar} alt={post.name} />
              <div className="name-date-container">
                <h5 className="name">{post.name}</h5>
                <span className="date">{post.createdAt}</span>
              </div>
            </section>
            <section className="sec-right">
              <BiDotsHorizontalRounded
                className="icon"
                onClick={() => setIsDotClicked(post.docId)}
              />

              {isDotClicked === post.docId && (
                <DotMenu
                  docId={post.docId}
                  post={post}
                  isDotClicked={isDotClicked}
                  setIsDotClicked={setIsDotClicked}
                  setDeleted={setDeleted}
                />
              )}
            </section>
          </div>
          <div className="card-body" onClick={handleComment}>
            {post.text && (
              <p className={post.text && post.file && "mb-3"}>{post.text}</p>
            )}

            {post.file && <img src={post.file} alt={post.text} />}
          </div>
          <div className="card-footer">
            <AiOutlineLike className="icon" />
            {/* <AiFillLike className="icon" /> */}
            <AiOutlineDislike className="icon" />
            {/* <AiFillDislike className="icon" /> */}

            <FaRegComment className="icon" onClick={handleComment} />
            <BiShareAlt className="icon" />
          </div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
}

export default Post;
