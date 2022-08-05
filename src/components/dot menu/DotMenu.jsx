import React, { useState } from "react";
import "./dotMenu.css";
import firestoreSevice from "../../firebase/firebaseFirestore";
import { useSelector } from "react-redux";
import UpdatedPost from "../modal/UpdatePost";

const bookmarks = [];

function DotMenu({ docId, isDotClicked, setIsDotClicked, post }) {

  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const [value, setValue] = useState();
  const [isEditClick, setIsEditClick] = useState(false);

  const deleteHandler = async (docId) => {
    await firestoreSevice.deleteDocument("posts", docId);
  };

  const handleEdit = async (docId) => {
    const snapshot = await firestoreSevice.getDocument("posts", docId);
    const { text, file } = snapshot.data();
    setValue({ text, file });
    setIsEditClick(true);
  };

  const handleBookmark = async (post) => {
    setIsDotClicked(false);
    if (!bookmarks.includes(post)) {
      bookmarks.push(post);
    }
    await firestoreSevice.setDocument("bookmarks", currentUser.id, {
      bookmarks,
    });
  };

  return (
    <>
      {isEditClick && (
        <div className="edit-post col-5">
          <UpdatedPost
            value={value}
            docId={docId}
            setIsDotClicked={setIsDotClicked}
            setIsEditClick={setIsEditClick}
            isEditClick={isEditClick}
            show={isEditClick}
            onHide={() => setIsEditClick(false)}
          />
        </div>
      )}

      {isDotClicked && (
        <div className="dotMenu-container">
          <div
            className="overlay"
            onClick={() => {
              setIsDotClicked(false);
            }}
          ></div>
          <div className="card p-1">
            <button
              className="btn btn-savePost btn-sm "
              onClick={() => handleBookmark(post)}
            >
              <i className="bi bi-bookmark"></i> Save post
            </button>
            {currentUser.id === post.userId && (
              <>
                <button
                  className="btn btn-editPost btn-sm "
                  onClick={() => handleEdit(docId)}
                >
                  <i className="bi bi-pencil-square"></i> Edit post
                </button>

                <button
                  className="btn btn-deletePost btn-sm "
                  onClick={() => {
                    deleteHandler(docId);
                  }}
                >
                  <i className="bi bi-trash"></i> Delete post
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DotMenu;
