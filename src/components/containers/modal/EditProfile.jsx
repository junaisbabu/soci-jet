import React from "react";
import { useState } from "react";
import "./editProfile.css";
import firestoreSevice from "../../../firebase/firebaseFirestore";
import { useDispatch, useSelector } from "react-redux";
import { onAuth } from "../../../redux/actions/Actions";
import firebaseStorageService from "../../../firebase/firebaseStorage";
import Modal from "react-bootstrap/Modal";

function EditProfile(props) {
  const setEditUser = props.setEditUser;
  const setUser = props.setUser;

  const user = useSelector((state) => state.loggedUser.currentUser);
  const dispatch = useDispatch();

  const [changeAvatar, setChangeAvatar] = useState(null);
  const [updateName, setUpdateName] = useState(user.name);
  const [updateUsername, setUpdateUsername] = useState(user.username);
  const [updateBio, setUpdateBio] = useState(user.bio);
  const [updateLink, setUpdateLink] = useState(user.link);

  const handleUpdate = async () => {
    // const url = await firebaseStorageService.addPost(changeAvatar);

    //   updateProfile(auth.currentUser, {
    //     displayName: updateName,
    //     photoURL: url
    //   })
    const updateData = {
      name: updateName,
      username: updateUsername,
      bio: updateBio,
      link: updateLink,
      avatar: user.avatar,
    };

    if (changeAvatar !== null) {
      const url = await firebaseStorageService.addPost(changeAvatar);
      updateData.avatar = url;
    }

    await firestoreSevice.updateDocument("users", user.id, updateData);

    const docSnap = await firestoreSevice.getDocument("users", user.id);
    setUser(docSnap.data());
    setEditUser(false);
  };
  return (
    <Modal
      {...props}
      className="editProfile-modal"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body">
        <div className="editProfile-container col-12">
          <div className="card">
            <div className="card-body">
              <section className="form-group sec">
                <label className="form-label">Avatar</label>
                <div className="upload-avater-container">
                  <input
                    type="file"
                    onChange={(e) => setChangeAvatar(e.target.files[0])}
                  />
                  <i class="bi bi-camera-fill"></i>
                  <img
                    src={
                      changeAvatar
                        ? URL.createObjectURL(changeAvatar)
                        : user.avatar
                    }
                    className="upload-avatar"
                    alt="..."
                  />
                </div>
              </section>
              <div className="form-group sec ">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  placeholder={user.name}
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </div>

              <div className="form-group sec ">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  placeholder={user.username}
                  value={updateUsername}
                  onChange={(e) => setUpdateUsername(e.target.value)}
                />
              </div>

              <div className="form-group sec">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder={user.bio}
                  value={updateBio}
                  onChange={(e) => setUpdateBio(e.target.value)}
                />
              </div>
              <div className="form-group sec">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={user.link}
                  value={updateLink}
                  onChange={(e) => setUpdateLink(e.target.value)}
                />
              </div>
              <button
                className="cancel-btn btn btn-danger btn-sm"
                onClick={() => setEditUser(false)}
              >
                Cancel
              </button>
              <button
                className="update-btn btn btn-success btn-sm"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfile;
