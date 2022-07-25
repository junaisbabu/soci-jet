import React, { useState } from "react";
import "./feedPost.css";
import Junais from "../../../images/avatar/Junais Babu.jpg";
import { useSelector } from "react-redux";
import DotMenu from "../dot menu/DotMenu";

function FeedPost() {
  const posts = useSelector((state) => state.addedPosts);

  const [isDotClicked, setIsDotClicked] = useState(0);
  const [deleted, setDeleted] = useState('');


  console.log("feedPost", posts);

  return (
    <div className="feedPost-container col-xs-10 col-sm-8 col-md-7 col-lg-5">
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.docId} className="row">
              <div className="card">
                <div className="card-header">
                  <section className="sec-left">
                    <img src={Junais} />
                    <div className="name-date-container">
                      <h5 className="name">Junais Babu</h5>
                      <span className="date">{post.createdAt}</span>
                    </div>
                  </section>
                  <section className="sec-right">
                    <i
                      className="bi bi-three-dots"
                      onClick={() => {
                        setIsDotClicked(post.docId);
                      }}
                    ></i>
                    {isDotClicked === post.docId && (
                      <DotMenu
                        docId={post.docId}
                        setIsDotClicked={setIsDotClicked}
                        setDeleted={setDeleted}
                      />
                    )}
                  </section>
                </div>
                <div className="card-body">
                  {post.text && (
                    <p className={post.text && post.url && "mb-3"}>
                      {post.text}
                    </p>
                  )}

                  {post.url && <img src={post.url} alt={post.text} />}
                </div>
                <div className="card-footer">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <i className="bi bi-hand-thumbs-down"></i>
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-share"></i>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FeedPost;
