import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingContext } from "../App";
import CreatePost from "../components/containers/create post/CreatePost";
import FeedPost from "../components/containers/feed post/FeedPost";
import Header from "../components/containers/header/Header";
import People from "../components/containers/people/People";
import TrendingLatest from "../components/containers/trending & latest/TrendingLatest";
import Spinner from "../components/loading spinner/Spinner";
import Search from "../search/Search";

function HomePage() {
  const [trendLatest, setTrendLatest] = useState("latest");
  const [searchClick, setSearchClick] = useState(false);

  const posts = useSelector((state) => state.addedPosts);
  const users = useSelector((state) => state.addedUsers.users);

  // const styles = {
  //   searchBody: {
  //     position: 'absolute',
  //     width: '100%',
  //     height: '',
  //     paddingTop: '30px',
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //     zIndex: 3
  //   },

  //   searchBar: {
  //     minWidth: '300px',
  //     margin: '0 auto'
  //   }
  // }

  {
    /* <div className="search-body" style={styles.searchBody}><div className="search-bar" style={styles.searchBar}><Search /></div></div> */
  }

  return (
    <>
      {posts && users ? (
        <>
          <Header />
          <div className="col-xs-10 col-sm-8 col-md-7 col-lg-5 mx-auto">
            <CreatePost value={{ editText: "", editPhoto: "" }} />
            <TrendingLatest
              trendLatest={trendLatest}
              setTrendLatest={setTrendLatest}
            />
            <People />
            <FeedPost />
          </div>
        </>
      ) : (
        <div
          className="spinner-body d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
}

export default HomePage;
