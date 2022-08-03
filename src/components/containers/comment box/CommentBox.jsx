import React from "react";
import "./commentBox.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";

function CommentBox({ styles, post }) {

  return (
    <div className="commentBox-container">
      <div className="card" style={styles.border}>
        <div className="row">
          <section className="sec-left sec col">
            <img
              className="avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahP8KdSO-tV3lDYllKTftXPTJ2H6UYlFevQ&usqp=CAU"
              alt="user profile"
            />
            <h6>Junais Babu</h6>
          </section>
          <section className="sec-right sec col">
            <BiDotsVerticalRounded />
          </section>
        </div>
        <div className="msg-box">
          <p className="msg-text">It's looks good</p>
          <div className="like-reply">
            <AiOutlineLike className="icon" /> <span>Reply</span>
          </div>
          <div className="reply-sec sec">
            <img
              className="avatar"
              src={post.userAvatar}
              alt="user avatar"
            />
            <div>
              <h6 className="">{post.name}</h6>
              <p className="reply-given">Thanks 😍</p>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control enter-comment shadow-none"
            placeholder="Enter your comment"
            aria-label="Enter your comment"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
