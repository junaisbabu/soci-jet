import React, { useEffect, useState } from "react";
import "./people.css";
import Junais from "../../../images/avatar/Junais Babu.jpg";
import firebaseFirestore from "../../../firebase/firebaseFirestore";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../../redux/constants/actionTypes";

function People() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.addedUsers.users);

  const getPeople = async () => {
    let snapshot = await firebaseFirestore.getAllUsers();

    let users = snapshot.docs.map((doc) => ({ ...doc.data() }));

    dispatch({ type: ActionTypes.ADD_NEW_USER, payLoad: users });
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="people-container col-xs-10 col-sm-8 col-md-7 col-lg-5">
      <div className="row col-12">
        {users &&
          users.map((user) => {
            return (
              <div className="card">
                <div className="card-img-container">
                  <img className="card-img-top" src={Junais} />
                  <span className="card-title">{user.name}</span>
                </div>
                <div className="card-body">
                  <button className="card-text">Follow</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default People;
