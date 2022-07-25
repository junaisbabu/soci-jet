import React, { useEffect, useState } from "react";
import "./createPost.css";
import Junais from "../../../images/avatar/Junais Babu.jpg";
import File_Upload from "../../../images/icons/file_upload.png";
import Emoji from "../../../images/icons/emoji.png";
import { useSelector, useDispatch } from "react-redux";
import firebaseStorageService from "../../../firebase/firebaseStorage";
import firebaseFirestore from "../../../firebase/firebaseFirestore";
import firestoreSevice from "../../../firebase/firebaseFirestore";
import { ActionTypes } from "../../../redux/constants/actionTypes";
import EmojiBox from "../../emoji/EmojiBox";

function CreatePost({ setIsPosted }) {
  const user = useSelector((state) => state.loggedUser.currentUser);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const [emojiClick, setEmojiClick] = useState(false);

  const fetchPosts = async () => {
    const posts = await firebaseFirestore.getPosts();
    console.log("createPosts: ", posts);
    dispatch({ type: ActionTypes.ADD_NEW_POST, payLoad: posts });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    const date = new Date();
    const url = await firebaseStorageService.addPost(image);
    let newPost = {
      userId: user.uid,
      text: text,
      url: url,
      createdAt: date.toDateString(),
    };
    await firestoreSevice.addPosts(newPost);
    fetchPosts();
    setImage(null);
    setText("");
    setIsPosted("Posted");
  };

  return (
    <div className="createPost-container col-xs-10 col-sm-8 col-md-7 col-lg-5">
      <div className="title-container">
        <h1 className="title">Create Post</h1>
      </div>
      <form onSubmit={handlePost}>
        <div className="form-container">
          <div className="form-group-1">
            <div className="d-flex">
              <img className="avatar" src={user.photoURL} alt="avatar" />
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
            {image && (
              <div className="file-container">
                <img
                  className="selected-file"
                  src={URL.createObjectURL(image)}
                  alt="selected-file"
                />
              </div>
            )}
          </div>
          <ul className="form-group form-group-2 photo-emojis-btn-container">
            <li className="btn btn-sm photo-gif-btn">
              <img className="pic" src={File_Upload} alt="pic" />
              <span>Photo/GIF</span>
              <input
                type="file"
                className="file-input"
                accept="image/png, image/gif image/jpeg image/jpg"
                onInput={(event) => setImage(event.target.files[0])}
              />
            </li>
            <li
              className="btn btn-sm emojis-btn"
              onClick={(event) => setEmojiClick(!emojiClick)}
            >
              <img src={Emoji} />
              Emojis
            </li>
          </ul>
          {emojiClick && (
            <EmojiBox setEmojiClick={setEmojiClick} setText={setText} />
          )}
        </div>
        <button
          type="submit"
          className="btn btn-sm post-btn col-11"
          disabled={text === "" && image === null ? true : false}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
