import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "./followersFollowing.css";

export default function FollowersFollowing(props) {
  const data = props.data;

  const navigate = useNavigate();

  const navigateProfile = (userId) => {
    navigate(`/profile/${userId}`);
    props.setModalShow(false);
  };

  return (
    <Modal
      {...props}
      className="followersFollowing-modal"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <ListGroup className="list-group">
          {data &&
            data.map((user) => {
              return (
                <ListGroup.Item
                  key={user.id}
                  className="list-item"
                  onClick={() => {
                    navigateProfile(user.id);
                  }}
                >
                  <img className="avatar" src={user.avatar} alt={user.name} />
                  <h4 className="name">{user.name}</h4>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
