import FollowersFollowing from "../modal/FollowersFollowing";

function Following({ followingUsers, modalShow, setModalShow }) {
  return (
    <>
      {followingUsers && (
        <FollowersFollowing
          data={followingUsers}
          title={"Following Users"}
          setModalShow={setModalShow}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}

export default Following;
