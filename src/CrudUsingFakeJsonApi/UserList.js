import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form,Badge,Card } from "react-bootstrap";
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

  const [addModal, setAddModal] = useState(false);
  const [addUserDataName, setAddUserDataName] = useState("")
  const [addUserDataEmail, setAddUserDataEmail] = useState("")
  const [addUserDataPhone, setAddUserDataPhone] = useState("")

  const [userSelectData, setUserSelectData] = useState([])
  const[selectButtonDisabled, setSelectButtonDisabled] = useState(false)

    const [cartModal, setCartModal] = useState(false);

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

  const addUser =()=>{
    setAddModal(true)
  }

  const addUserData=()=>{
    if (addUserDataName === "" && addUserDataEmail === "" && addUserDataPhone === "" ) {
      setErr('Enter your details')
      setTimeout(() => {
        setErr(null)
      }, 2000);
    }else{
      setUserAllDatas([...userAllDatas,
        {id: Date.now(), 
          name: addUserDataName,
          email:addUserDataEmail,
          phone: addUserDataPhone
        }
        ])
        setAddUserDataName('')
        setAddUserDataEmail('')
        setAddUserDataPhone('')
        setAddModal(false)
    }
  }

  const selectUser = (crr) => {
    let isPresent = false
    userSelectData.forEach((data)=>{
        if(data.id===crr.id){
            isPresent = true
            
        }
    })
    if(isPresent){
        return
    } 
    setUserSelectData([...userSelectData, crr])
    setSelectButtonDisabled(true)
}
const viewCartitem = () => {
  setCartModal(true)
}
const removeCartItem = (user) => {
  const updatedUser = userSelectData.filter((ele) => {
      return ele.id !== user.id
  })
  setUserSelectData(updatedUser)
  setSelectButtonDisabled(false)
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
                  onClick={() => addUser()}
                >
                  Add User
                </button>
                <Button className='mx-2' variant="success" disabled={userSelectData.length === 0} onClick={() => viewCartitem()}>Selected User <Badge bg="dark">{userSelectData.length}</Badge></Button>
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
                          <Button className='mx-1' variant="light" onClick={() => selectUser(udata)} disabled={selectButtonDisabled}>Select</Button>
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


      {/* Add Modal Start */}

      <Modal
        show={addModal}
        onHide={() => setAddModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {err ? <p className="text-danger text-center">{err}</p> : " "}
            <Form className="justify-content-center mt-4">
              <Form.Control
                size="md"
                className="m-1"
                type="text"
                value={addUserDataName}
                placeholder="Your name"
                onChange={(e)=>setAddUserDataName(e.target.value)}
              />

              <Form.Control
                size="md"
                className="m-1"
                type="text"
                value={addUserDataEmail}
                placeholder="Your email"
                onChange={(e)=>setAddUserDataEmail(e.target.value)}
              />
              <Form.Control
                size="md"
                className="m-1"
                type="text"
                value={addUserDataPhone}
                placeholder="Your phone"
                onChange={(e)=>setAddUserDataPhone(e.target.value)}
              />
              <Button type='button' className='m-3' variant="primary"  onClick={()=>addUserData()}>Add User</Button>
              
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Modal End */}

      <Modal show={cartModal} onHide={() => setCartModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Cart Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userSelectData.length > 0 &&
                        userSelectData.map((item, index) => {
                            return (
                                <Card key={index} style={{ width: '100%', marginBottom: '5px' }}>
                                    <Card.Body>
                                        <Card.Title>{item.name} </Card.Title>
                                        <p>{item.email} </p>
                                        <p> {item.phone}</p>
                                        <Button variant="danger" onClick={() => removeCartItem(item)}>X</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
    </div>
  );
};

export default UserList;
