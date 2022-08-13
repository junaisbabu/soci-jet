import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/create post/CreatePost";
import FeedPost from "../components/feed post/FeedPost";
import Header from "../components/header/Header";
import People from "../components/people/People";
import TrendingLatest from "../components/trending & latest/TrendingLatest";
import Spinner from "../components/loading spinner/Spinner";

function HomePage() {
  const [trendLatest, setTrendLatest] = useState("latest");

  const posts = useSelector((state) => state.addedPosts);
  const users = useSelector((state) => state.addedUsers.users);

  return (
    <>
      {posts && users ? (
        <>
          <Header />
          <div className="col-sm-10 col-md-7 col-lg-5 mx-auto">
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
