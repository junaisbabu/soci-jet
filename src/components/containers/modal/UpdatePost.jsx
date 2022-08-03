import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import CreatePost from "../create post/CreatePost";

export default function UpdatedPost(props) {
  const value = props.value;
  const docId = props.docId;
  const setIsEditClick = props.setIsEditClick;

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
          setIsEditClick={setIsEditClick}
        />
      </div>
    </Modal>
  );
}
