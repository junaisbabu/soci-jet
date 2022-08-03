import React, { useEffect, useState, useRef } from "react";
import "./dotMenu.css";
import firestoreSevice from "../../../firebase/firebaseFirestore";
import { useDispatch, useSelector } from "react-redux";
import UpdatedPost from "../modal/UpdatePost";

const bookmarks = [];

const useClickOutsideDot = (handler) => {
  const dotMenuRef = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!dotMenuRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return dotMenuRef;
};

function DotMenu({ docId, isDotClicked, setIsDotClicked, post }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const [value, setValue] = useState("");
  const [isEditClick, setIsEditClick] = useState(false);

  const deleteHandler = async (docId) => {
    await firestoreSevice.deleteDocument("posts", docId);
  };

  const handleEdit = async (docId) => {
    const snapshot = await firestoreSevice.getDocument("posts", docId);
    const { text, url } = snapshot.data();
    setValue({ text, url });
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

  // let dotMenuElement = useClickOutsideDot(() => {
  //   setIsDotClicked(false);
  //   setIsEditClick(false);
  // });

  return (
    <>
      {isEditClick && (
        <div className="edit-post col-5">
          <UpdatedPost
            value={value}
            docId={docId}
            setIsEditClick={setIsEditClick}
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
          <div className="card">
            <button
              className="btn btn-savePost btn-sm "
              onClick={() => handleBookmark(post)}
            >
              <i className="bi bi-bookmark"></i> Save post
            </button>
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
          </div>
        </div>
      )}
    </>
  );
}

export default DotMenu;
