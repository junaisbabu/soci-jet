import { useSelector } from "react-redux";
import Post from "../feed post/Post";
import "../feed post/feedPost.css";

function Bookmarks({ currentUserId, styles }) {
  const bookmarks = useSelector((state) => state.bookmarks);

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
          return <Post key={post.docId} post={post} styles={styles} />;
        })}
    </div>
  );
}

export default Bookmarks;
