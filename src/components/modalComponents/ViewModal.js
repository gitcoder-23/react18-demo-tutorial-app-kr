import React from 'react';
import { Button, Modal } from 'react-bootstrap';

// const ViewModal = (props) => {
// console.log('props=>', props);
// const { showViewModal } = props;
const ViewModal = ({ showViewModal, setShowViewModal, viewUserData }) => {
  return (
    <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>View User Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <h2>{viewUserData.name}</h2>
          <p>Email - {viewUserData.email}</p>
          <p>Phone - {viewUserData.phone}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowViewModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
