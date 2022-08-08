import { useSelector } from "react-redux";
import Post from "../feed post/Post";
import "../feed post/feedPost.css";
import { useState } from "react";

function Bookmarks({ currentUserId, styles }) {
  const [likeDislike, setLikeDislike] = useState(false);
  const bookmarks = useSelector((state) => state.bookmarks);
  const currentUser = useSelector((state) => state.loggedUser.currentUser);

  const {id} = currentUser;

  const getBookmarks = () => {
    return bookmarks
      .filter((item) => {
        return item.docId === currentUserId;
      })
      .map((item) => {
        return item.bookmarks;
      });
  };

  const [bookmark] = getBookmarks();

  return (
    <div className="feedPost-container">
      {bookmark &&
        bookmark.map((post) => {
          return <Post key={post.docId} post={post} userId={id} styles={styles} likeDislike={likeDislike} setLikeDislike={setLikeDislike} />;
        })}
    </div>
  );
}

export default Bookmarks;
