import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner, Table, Button, Modal } from 'react-bootstrap';

const UserList = () => {
  const [userAllDatas, setUserAllDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [viewUserData, setViewUserData] = useState(null)

  const [show, setShow] = useState(false);


  const getAllUsers = () => {
    setIsLoading(true);
    // Async OPS
    axios
      .get(`${process.env.REACT_APP_JSON_BASE_URL}/users`)
      .then((response) => {
        console.log('response=>', response);
        if (response.status === 200) {
          setUserAllDatas(response.data);
          setIsLoading(false);
          setIsError(false);
        }
      })
      .catch((err) => {
        console.log('err=>', err);
        setIsError(true);
        setIsLoading(false);
      });
  };
  const ViewItem = (user) => {
    setViewUserData(user)
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  // console.log('userAllDatas-=>', userAllDatas);

  return (
    <div className="container">
      <h2>Json API CRUD</h2>
      {isLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : isError ? (
        <h4 style={{ color: 'red' }}> Something went wrong!</h4>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#Sl.No.</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          {userAllDatas &&
            userAllDatas.map((udata) => {
              return (
                <tbody key={udata.id}>
                  <tr>
                    <td>{udata.id}</td>
                    <td>{udata.name}</td>
                    <td>{udata.email}</td>
                    <td>{udata.phone}</td>
                    <td><Button className='mx-1' variant="success" onClick={() => handleShow()}>View</Button></td>
                    <td><Button className='mx-1' variant="danger">Delete</Button></td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
