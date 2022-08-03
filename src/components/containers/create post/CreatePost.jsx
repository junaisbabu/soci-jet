import React, { useContext, useEffect, useState } from "react";
import "./createPost.css";
import File_Upload from "../../../images/icons/file_upload.png";
import Emoji from "../../../images/icons/emoji.png";
import { useSelector, useDispatch } from "react-redux";
import firebaseStorageService from "../../../firebase/firebaseStorage";
import firebaseFirestore from "../../../firebase/firebaseFirestore";
import firestoreSevice from "../../../firebase/firebaseFirestore";
import { ActionTypes } from "../../../redux/constants/actionTypes";
import EmojiBox from "../../emoji/EmojiBox";
import { LoadingContext } from "../../../App";
import Spinner from "../../loading spinner/Spinner";

function CreatePost({ value, docId, setIsEditClick }) {
  const user = useSelector((state) => state.loggedUser.currentUser);
  const users = useSelector((state) => state.addedUsers.users);
  const dispatch = useDispatch();
  const { load, setLoad } = useContext(LoadingContext);

  const editText = value.text;
  const editPhoto = value.url;

  const [text, setText] = useState(editText);
  const [image, setImage] = useState(null);


  const [emojiClick, setEmojiClick] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (text === null && image === null) return;
    const date = new Date();
    const url = await firebaseStorageService.addPost(image);
    let newPost = {
      userId: user.id,
      name: user.name,
      userAvatar: user.avatar,
      text: text,
      file: url,
      createdAt: date.toDateString(),
    };
    await firestoreSevice.addDocument("posts", newPost);

    setImage(null);
    setText("");
    setLoad(false);
  };

  const handleUpdatePost = async () => {
    const url = await firebaseStorageService.addPost(image);
    let updatedPost = {
      text: text,
      file: url,
    };

    firestoreSevice.updateDocument("posts", docId, updatedPost);

    setIsEditClick(false);
  };

  return (
    <>
      <div className="createPost-container col-12 ">
        {load && (
          <div className="spinner-body">
            <div className="spinner-icon">
              <Spinner />
            </div>
          </div>
        )}
        <div className="title-container">
          <h1 className="title">
            {editText || editPhoto ? "Edit Post" : "Create Post"}
          </h1>
        </div>
        <form>
          <div className="form-container">
            <div className="form-group-1">
              <div className="d-flex">
                <img className="avatar" src={user.avatar} alt="avatar" />
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Write something here"
                  id="write-here"
                  autoComplete="off"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
              {image ? (
                <div className="file-container">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setImage(null)}
                  ></button>
                  <img
                    className="selected-file"
                    src={URL.createObjectURL(image)}
                    alt="selected-file"
                  />
                </div>
              ) : (
                editPhoto && (
                  <div className="file-container">
                    <img
                      className="selected-file"
                      src={editPhoto}
                      alt="selected-file"
                    />
                  </div>
                )
              )}
            </div>
            <ul className="form-group form-group-2 photo-emojis-btn-container">
              <li className="photo-emoji-btn">
                <img className="pic" src={File_Upload} alt="pic" />
                <span>Photo/GIF</span>
                <input
                  type="file"
                  className="file-input"
                  accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                  onInput={(event) => setImage(event.target.files[0])}
                />
              </li>
              <li
                className="photo-emoji-btn"
                onClick={() => setEmojiClick(!emojiClick)}
              >
                <img src={Emoji} alt="emoji" />
                Emojis
              </li>
            </ul>
            {emojiClick && (
              <EmojiBox setEmojiClick={setEmojiClick} setText={setText} />
            )}
          </div>
          {editText || editPhoto ? (
            <button
              type="button"
              className="post-btn col-11"
              disabled={text === "" && image === null && true}
              onClick={handleUpdatePost}
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              className="post-btn col-11"
              disabled={
                (text === undefined || text === "") && image === null
                  ? true
                  : false
              }
              onClick={handleCreatePost}
            >
              Post
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default CreatePost;
