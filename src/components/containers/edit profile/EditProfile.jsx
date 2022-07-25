import { useState } from "react";
import Junais from "../../../images/avatar/Junais Babu.jpg";
import "./editProfile.css";
import { getAuth, updateProfile } from "firebase/auth";

function EditProfile({ editStatus, setEditStatus }) {
  const auth = getAuth();

  const [updateName, setUpdateName] = useState("");

  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: updateName,
    })
      .then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        console.log("error: ", error.message);
      });
  };
  return (
    <>
      <div className="editProfile-container col-sm-8">
        <div className="card">
          <div className="card-body">
            <section className="form-group sec">
              <label className="form-label">Avatar</label>
              <div className="upload-avater-container">
                <input type="file" />
                <i class="bi bi-camera-fill"></i>
                <img src={Junais} className="upload-avatar" alt="..." />
              </div>
            </section>
            <div className="form-group sec ">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>
            
            <div className="form-group sec">
              <label className="form-label">Bio</label>
              <textarea className="form-control" rows="4" />
            </div>
            <div className="form-group sec">
              <label className="form-label">Link</label>
              <input type="text" className="form-control" />
            </div>
            <button
              className="cancel-btn btn btn-danger btn-sm"
              onClick={() => setEditStatus(!editStatus)}
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
    </>
  );
}

export default EditProfile;
