import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import "./followersFollowing.css";

export default function FollowersFollowing(props) {
  const data = props.data;

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
                <ListGroup.Item key={user.id} className="list-item">
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
