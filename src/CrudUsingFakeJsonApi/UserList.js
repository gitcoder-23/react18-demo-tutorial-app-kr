import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import SpinnerComponent from "../components/SpinnerComponent";

const UserList = () => {
  const [userAllDatas, setUserAllDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [viewUserData, setViewUserData] = useState({});

 
  //Search
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editUserDataId, setEditUserDataId] = useState()
  const [editUserDataName, setEditUserDataName] = useState("")
  const [editUserDataEmail, setEditUserDataEmail] = useState("")
  const [editUserDataPhone, setEditUserDataPhone] = useState("")

  const [err, setErr]=useState('')


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
        console.log("err=>", err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //console.log("userAllDatas-=>", userAllDatas);

  const viewUserDetails = (vdata) => {
    // console.log('vdata=>', vdata);
    setShowViewModal(true);
    if (vdata) {
      setViewUserData(vdata);
    }
  };

  const searchSubmit = (evt) => {
    evt.preventDefault();
    setQuery(search);
  };

  const resetSearch = () => {
    setSearch("");
    setQuery("");
  };

  const deleteUser = (crr) => {
    if (window.confirm("Do you want to delete?")) {
      const updateAllUser = userAllDatas.filter((user) => {
        return user.id !== crr.id;
      });
      setUserAllDatas(updateAllUser);
    }
  };

  const editUser = (data) => {
    setShowEditModal(true);
    setEditUserDataId(data.id)
    setEditUserDataName(data.name)
    setEditUserDataEmail(data.email)
    setEditUserDataPhone(data.phone)
  }

  const cancelEdit=()=>{
    setShowEditModal(false);
    setEditUserDataName("")
    setEditUserDataEmail("")
    setEditUserDataPhone("")
  }

  const SubmitData=()=>{
    if(editUserDataName=== '' && editUserDataEmail=== '' && editUserDataPhone=== ''){
      setErr('Edit your details')
    }else{
      const updateAllUser = userAllDatas.map((item)=>{
        if(item.id===editUserDataId){
          return {
            ...userAllDatas, 
            name:editUserDataName, 
            email:editUserDataEmail,
            phone:editUserDataPhone
          }
        }
        return item
      })
      //console.log('updateAllUser -', updateAllUser)
      setUserAllDatas(updateAllUser)
      setShowEditModal(false);
    }
  }

  //console.log('editUserData -', userAllDatas)

  return (
    <div className="container">
      <h2>Json API CRUD</h2>

      {isLoading ? (
        <SpinnerComponent />
      ) : isError ? (
        <h4 style={{ color: "red" }}> Something went wrong!</h4>
      ) : (
        <>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={() => searchSubmit()}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />{" "}
                &nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => resetSearch()}
                >
                  Reset
                </button>{" "}
                &nbsp;
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => resetSearch()}
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
          <Table striped bordered hover variant="dark" className="mt-4">
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
              userAllDatas
                .filter((val) => {
                  // console.log('val=>', val);
                  if (search === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.email.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })

                .map((udata, index) => {
                  return (
                    <tbody key={udata.id}>
                      <tr>
                        <td>{index + 1}</td>
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
                          </Button>
                          &nbsp;
                          <Button
                            className="mx-1"
                            variant="info"
                            onClick={() => editUser(udata)}
                          >
                            Edit
                          </Button>
                          &nbsp;
                          <Button
                            className="mx-1"
                            variant="danger"
                            onClick={() => deleteUser(udata)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
          </Table>
        </>
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
      {/* View Modal End */}

      {/* Edit Modal Start */}

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form className="justify-content-center mt-4">
              <Form.Control
                size="md"
                className="m-1"
                type="text"
                value={editUserDataName}
                placeholder="Edit your name here"
                onChange={(e)=>setEditUserDataName(e.target.value)}
              />

              <Form.Control
                size="md"
                className="m-1"
                type="text"
                value={editUserDataEmail}
                placeholder="Edit your email here"
                onChange={(e)=>setEditUserDataEmail(e.target.value)}
              />
              <Form.Control
                size="md"
                className="m-1"
                type="text"
                value={editUserDataPhone}
                placeholder="Edit your phone here"
                onChange={(e)=>setEditUserDataPhone(e.target.value)}
              />
              <Button type='button' className='m-3' variant="primary"  onClick={()=>SubmitData()}>Edit Submit</Button>
              <Button type='button' className='m-3' variant="danger" onClick={()=>cancelEdit()}>Cancel</Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal End */}
    </div>
  );
};

export default UserList;
