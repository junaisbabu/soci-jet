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
import firestoreSevice from "../../firebase/firebaseFirestore";

function Post({ post, styles, userId, likeDislike, setLikeDislike }) {
  const navigate = useNavigate();
  const [isDotClicked, setIsDotClicked] = useState(0);
  const [deleted, setDeleted] = useState("");

  const { likes, dislikes } = post;

  const handleLike = async (docId) => {
    let likesArr = [];
    if (likes) {
      likesArr = likes.slice();
      likesArr.push(userId);
    } else {
      likesArr.push(userId);
    }

    await firestoreSevice.updateDocument("posts", docId, {
      likes: likesArr,
    });

    if (dislikes) {
      const copyArr = dislikes.slice();
      let elIndex = copyArr.indexOf(userId);
      if (elIndex !== -1) {
        copyArr.splice(elIndex, 1);

        firestoreSevice.updateDocument("posts", docId, {
          dislikes: copyArr,
        });
      }
    }

    if (likeDislike !== undefined) setLikeDislike(!likeDislike);
  };

  const handleDislike = async (docId) => {
    let dislikesArr = [];
    if (dislikes) {
      dislikesArr = dislikes.slice();
      dislikesArr.push(userId);
    } else {
      dislikesArr.push(userId);
    }

    await firestoreSevice.updateDocument("posts", docId, {
      dislikes: dislikesArr,
    });

    if (likes) {
      const copyArr = likes.slice();
      let elIndex = copyArr.indexOf(userId);
      if (elIndex !== -1) {
        copyArr.splice(elIndex, 1);

        firestoreSevice.updateDocument("posts", docId, {
          likes: copyArr,
        });
      }
    }

    if (likeDislike !== undefined) setLikeDislike(!likeDislike);
  };

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
            <div className="like-body">
              {likes ? (
                likes.includes(userId) ? (
                  <AiFillLike className="icon" />
                ) : (
                  <AiOutlineLike
                    className="icon"
                    onClick={() => handleLike(post.docId)}
                  />
                )
              ) : (
                <AiOutlineLike
                  className="icon"
                  onClick={() => handleLike(post.docId)}
                />
              )}

              <span>{likes ? likes.length : 0}</span>
            </div>

            {dislikes ? (
              dislikes.includes(userId) ? (
                <AiFillDislike className="icon" />
              ) : (
                <AiOutlineDislike
                  className="icon"
                  onClick={() => handleDislike(post.docId)}
                />
              )
            ) : (
              <AiOutlineDislike
                className="icon"
                onClick={() => handleDislike(post.docId)}
              />
            )}

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
