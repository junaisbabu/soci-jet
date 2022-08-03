import React, { useEffect, useState } from "react";
import firestoreSevice from "../../../firebase/firebaseFirestore";
import FollowersFollowing from "../modal/FollowersFollowing";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Following({ followingUsers, modalShow, setModalShow }) {
  return (
    <>
      {followingUsers && (
        <FollowersFollowing
          data={followingUsers}
          title={"Following Users"}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}

export default Following;
