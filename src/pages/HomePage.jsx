import React, { useEffect, useState } from "react";
import CreatePost from "../components/containers/create post/CreatePost";
import FeedPost from "../components/containers/feed post/FeedPost";
import Header from "../components/containers/header/Header";
import People from "../components/containers/people/People";
import TrendingLatest from "../components/containers/trending & latest/TrendingLatest";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { onAuth } from "../redux/actions/Actions";

function HomePage() {
  const dispatch = useDispatch();
  const [isPosted, setIsPosted] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(onAuth(currentUser));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Header />
      <CreatePost setIsPosted={setIsPosted} />
      <TrendingLatest />
      <People />
      <FeedPost isPosted={isPosted} />
    </>
  );
}

export default HomePage;
