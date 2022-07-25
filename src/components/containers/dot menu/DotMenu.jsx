import React, { useState } from "react";
import "./dotMenu.css";
import firestoreSevice from "../../../firebase/firebaseFirestore";
import firebaseFirestore from "../../../firebase/firebaseFirestore";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../redux/constants/actionTypes";

function DotMenu({ docId, setDeleted }) {
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    const posts = await firebaseFirestore.getPosts();
    console.log("createPosts: ", posts);
    dispatch({ type: ActionTypes.ADD_NEW_POST, payLoad: posts });
  };

  const deleteHandler = async (docId) => {
    await firestoreSevice.deletePost(docId);
    fetchPosts();
  };

  console.log("docId: ", docId);

  return (
    <div className="dotMenu-container">
      <div className="card">
        <button className="btn btn-savePost btn-sm ">
          <i class="bi bi-bookmark"></i> Save post
        </button>
        <button className="btn btn-editPost btn-sm ">
          <i class="bi bi-pencil-square"></i> Edit post
        </button>

        <button
          className="btn btn-deletePost btn-sm "
          onClick={() => {
            deleteHandler(docId);
          }}
        >
          <i class="bi bi-trash"></i> Delete post
        </button>
      </div>
    </div>
  );
}

export default DotMenu;
