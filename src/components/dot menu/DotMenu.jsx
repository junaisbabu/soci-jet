import React, { useEffect, useState } from "react";
import "./dotMenu.css";
import firestoreSevice from "../../firebase/firebaseFirestore";
import { useSelector } from "react-redux";
import UpdatedPost from "../modal/UpdatePost";
import {useNavigate} from 'react-router-dom'

function DotMenu({ docId, isDotClicked, setIsDotClicked, post }) {
  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const bookmarks = useSelector((state) => state.bookmarks);
  const [bookmarked, setBookmarked] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [value, setValue] = useState();
  const [isEditClick, setIsEditClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookmarks) {
      const bookmarked = getBookmarks(docId);

      setIsBookmarked(bookmarked);
    }
  }, []);

  const getBookmarks = (docId) => {
    const current = bookmarks.filter((item) => {
      return item.docId === currentUser.id;
    });

    if (current.length > 0) {
      setBookmarked(current[0].bookmarks);
      const isBookmarked = current[0].bookmarks.some((obj) => {
        return obj.docId === docId;
      });

      return isBookmarked;
    }
  };

  const deleteHandler = async (docId) => {
    await firestoreSevice.deleteDocument("posts", docId);
    navigate('/');
  };

  const handleEdit = async (docId) => {
    const snapshot = await firestoreSevice.getDocument("posts", docId);
    const { text, file } = snapshot.data();
    setValue({ text, file });
    setIsEditClick(true);
  };

  const handleBookmark = async (post, textContent) => {
    setIsDotClicked(false);
    if (textContent.includes("Save post")) {
      bookmarked.push(post);
      console.log(bookmarked);

      await firestoreSevice.setDocument("bookmarks", currentUser.id, {
        bookmarks: bookmarked,
      });
    } else {
      const removedBookmark = bookmarked.filter((item) => {
        return item.docId !== post.docId;
      });

      await firestoreSevice.setDocument("bookmarks", currentUser.id, {
        bookmarks: removedBookmark,
      });
    }
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
              className={
                isBookmarked
                  ? "btn btn-deletePost btn-sm"
                  : "btn btn-savePost btn-sm "
              }
              onClick={(e) => handleBookmark(post, e.target.textContent)}
            >
              {isBookmarked ? (
                <i className="bi bi-trash"></i>
              ) : (
                <i className="bi bi-bookmark"></i>
              )}{" "}
              {isBookmarked ? "Romove saved" : "Save post"}
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
