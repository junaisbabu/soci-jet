import Modal from "react-bootstrap/Modal";
import CreatePost from "../create post/CreatePost";

export default function UpdatedPost(props) {
  const {value, docId, isEditClick, setIsEditClick, setIsDotClicked} = props;

  return (
    <Modal
      {...props}
      className="updatePost-modal"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{ backgroundColor: "var(--card-color)" }}>
        <CreatePost
          value={value}
          docId={docId}
          isEditClick={isEditClick}
          setIsEditClick={setIsEditClick}
          setIsDotClicked={setIsDotClicked}
        />
      </div>
    </Modal>
  );
}
