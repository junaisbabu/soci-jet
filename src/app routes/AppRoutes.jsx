import { onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SignupPage from "../pages/SignupPage";
import SinglePostPage from "../pages/SinglePostPage";
import { ActionTypes } from "../redux/constants/actionTypes";
import ProtectedRoute from "./ProtectedRoute";
import firestoreSevice from "../firebase/firebaseFirestore";
import PreventBack from "./PreventBack";

function AppRoutes() {
  const dispatch = useDispatch();



  const queryPeople = async () => {
    const q = await firestoreSevice.getQuery("users");
    const unsub = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      dispatch({ type: ActionTypes.ADD_PEOPLE, payLoad: users });
    });

    return unsub;
  };

  const queryPost = async () => {
    const q = await firestoreSevice.getPostsQuery();
    const unsub = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      dispatch({ type: ActionTypes.ADD_POSTS, payLoad: posts });
    });

    return unsub;
  };

  const queryFollowing = async () => {
    const q = await firestoreSevice.getQuery("following");
    const unsub = onSnapshot(q, (snapshot) => {
      const following = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      dispatch({ type: ActionTypes.FOLLOWING, payLoad: following });
    });

    return unsub;
  };

  const queryFollowers = async () => {
    const q = await firestoreSevice.getQuery("followers");
    const unsub = onSnapshot(q, (snapshot) => {
      const followers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      dispatch({ type: ActionTypes.FOLLOWERS, payLoad: followers });
    });

    return unsub;
  };

  const queryBookmarks = async () => {
    const q = await firestoreSevice.getQuery("bookmarks");
    const unsub = onSnapshot(q, (snapshot) => {
      const bookmarks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      dispatch({ type: ActionTypes.BOOKMARKS, payLoad: bookmarks });
    });

    return unsub;
  };

  useEffect(() => {
    queryPeople();
    queryPost();
    queryFollowing();
    queryFollowers();
    queryBookmarks();
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PreventBack>
            <LoginPage />
          </PreventBack>
        }
      />
      <Route
        path="/signup"
        element={
          <PreventBack>
            <SignupPage />
          </PreventBack>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/:profileid" element={<ProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/post/:postid" element={<SinglePostPage />} />
    </Routes>
  );
}

export default AppRoutes;
