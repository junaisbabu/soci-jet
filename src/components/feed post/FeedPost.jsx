import { useSelector } from "react-redux";
import Post from "./Post";
import "./feedPost.css";

function FeedPost() {
  const posts = useSelector((state) => state.addedPosts);
  const currentUser = useSelector((state) => state.loggedUser.currentUser);
  const {id} = currentUser;

  const feedPostStyle = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <>
      <div className="feedPost-container">
        {posts &&
          posts.map((post) => {
            return <Post key={post.docId} post={post} userId={id} styles={feedPostStyle} />;
          })}
      </div>
    </>
  );
}

export default FeedPost;
