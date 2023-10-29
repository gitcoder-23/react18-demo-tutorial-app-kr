import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import SpinnerComponent from '../components/SpinnerComponent';

const UserList = () => {
  const [userAllDatas, setUserAllDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [viewUserData, setViewUserData] = useState({});

  const [showViewModal, setShowViewModal] = useState(false);

  const getAllUsers = () => {
    setIsLoading(true);
    // Async OPS
    axios
      .get(`${process.env.REACT_APP_JSON_BASE_URL}/users`)
      .then((response) => {
        // console.log('response=>', response);
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

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  // console.log('userAllDatas-=>', userAllDatas);

  const viewUserDetails = (vdata) => {
    // console.log('vdata=>', vdata);
    setShowViewModal(true);
    if (vdata) {
      setViewUserData(vdata);
    }
  };

  console.log('viewUserData=>', viewUserData);

  return (
    <div className="container">
      <h2>Json API CRUD</h2>
      {isLoading ? (
        <SpinnerComponent />
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
                    <td>
                      <Button
                        className="mx-1"
                        variant="success"
                        onClick={() => viewUserDetails(udata)}
                      >
                        View
                      </Button>&nbsp;
                      <Button className="mx-1" variant="danger">
                        Delete
                      </Button>
                    </td>
                    
                  </tr>
                </tbody>
              );
            })}
        </Table>
      )}

      {/* View Modal Start */}

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>View User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <h2>{viewUserData.name}</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Modal End */}
    </div>
  );
};

export default UserList;
