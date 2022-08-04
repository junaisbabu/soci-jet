import React, { useContext, useState } from "react";
import "./createPost.css";
import File_Upload from "../../images/icons/file_upload.png";
import Emoji from "../../images/icons/emoji.png";
import { useSelector } from "react-redux";
import firebaseStorageService from "../../firebase/firebaseStorage";
import firestoreSevice from "../../firebase/firebaseFirestore";
import EmojiBox from "../emoji/EmojiBox";
import { LoadingContext } from "../../App";
import Spinner from "../loading spinner/Spinner";

function CreatePost({
  value,
  docId,
  isEditClick,
  setIsEditClick,
  setIsDotClicked,
}) {
  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const { load, setLoad } = useContext(LoadingContext);

  const editText = value.text;
  const editFile = value.file;

  const [text, setText] = useState(editText);
  const [image, setImage] = useState(null);
  const [editPhoto, setEditPhoto] = useState(editFile);

  const [emojiClick, setEmojiClick] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (text === null && image === null) return;
    const date = new Date();
    const url = await firebaseStorageService.addPost(image);
    let newPost = {
      userId: currentUser.id,
      name: currentUser.name,
      userAvatar: currentUser.avatar,
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
    setLoad(true);
    const url = await firebaseStorageService.addPost(image);
    let updatedPost = {
      text: text,
      file: url,
    };

    firestoreSevice.updateDocument("posts", docId, updatedPost);

    setLoad(false);
    setIsEditClick(false);
    setIsDotClicked(false);
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
          <h1 className="title">{isEditClick ? "Edit Post" : "Create Post"}</h1>
        </div>
        <form>
          <div className="form-container">
            <div className="form-group-1">
              <div className="d-flex">
                <img className="avatar" src={currentUser.avatar} alt="avatar" />
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
              {(image || editPhoto) && (
                <div className="file-container">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      setImage(null);
                      setEditPhoto(null);
                    }}
                  ></button>
                  <img
                    className="selected-file"
                    src={editPhoto ? editPhoto : URL.createObjectURL(image)}
                    alt="selected-file"
                  />
                </div>
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
              <EmojiBox
                setEmojiClick={setEmojiClick}
                text={text}
                setText={setText}
              />
            )}
          </div>
          {isEditClick ? (
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
