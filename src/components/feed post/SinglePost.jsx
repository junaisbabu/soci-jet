import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import firestoreSevice from "../../firebase/firebaseFirestore";
import Header from "../header/Header";
import "./feedPost.css";
import CommentBox from "../comment box/CommentBox";
import Loading from "../loading spinner/Loading";
import { useSelector } from "react-redux";

function SinglePost() {
  const [post, setPost] = useState();
  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const { id } = currentUser;
  const [likeDislike, setLikeDislike] = useState(false);

  const { postid } = useParams();

  const fetchPost = async () => {
    const docSnap = await firestoreSevice.getDocument("posts", postid);
    setPost(docSnap.data());
  };

  useEffect(() => {
    fetchPost();
  }, [likeDislike]);

  const border = {
    border: "none",
  };

  const styles = {
    background: "var(--card-color)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: "15px",
  };

  return (
    <>
      <Header />
      {post ? (
        <div
          className="feedPost-container col-xs-10 col-sm-8 col-md-7 col-lg-5"
          style={styles}
        >
          <div>
            <Post post={post} styles={border} userId={id} likeDislike={likeDislike} setLikeDislike={setLikeDislike} />
            <CommentBox post={post} styles={{ border }} />
          </div>
        </div>
      ) : (
        <div
          className="spinner-body d-flex align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <Loading />
        </div>
      )}
    </>
  );
}

export default SinglePost;
