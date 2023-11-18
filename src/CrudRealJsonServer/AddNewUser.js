import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AddNewUser = () => {
  const navigate = useNavigate();
  const [userFormState, setUserFormState] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userGender: "",
  });

  console.log("userFormState=>", userFormState.userGender);

  const addNewUser = () => {
    if (
      !userFormState.userName ||
      !userFormState.userEmail ||
      !userFormState.userPhone ||
      !userFormState.userGender
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const newData = {
        id: Date.now(),
        employeename: userFormState.userName,
        email: userFormState.userEmail,
        phone: userFormState.userPhone,
        gender: userFormState.userGender,
      };
      axios
        .post(`${baseUrl}/user/`, newData)
        .then((addRsp) => {
          console.log("addRsp=>", addRsp);

          navigate("/jsonserver/newuserlist");
        })
        .catch((error) => {
          console.log("error=>", error);
        });
    }
  };
  return (
    <div className="container">
      <Form>
        <div className="row ">
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={userFormState.userName}
                onChange={(e) => {
                  setUserFormState({
                    ...userFormState,
                    userName: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={userFormState.userEmail}
                onChange={(e) => {
                  setUserFormState({
                    ...userFormState,
                    userEmail: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={userFormState.userPhone}
                onChange={(e) => {
                  setUserFormState({
                    ...userFormState,
                    userPhone: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={userFormState.userGender}
                onChange={(e) => {
                  setUserFormState({
                    ...userFormState,
                    userGender: e.target.value,
                  });
                }}
              >
                <option value="">--Select One--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="button" onClick={addNewUser}>
          Submit
        </Button>{" "}
        &nbsp;
        <Button variant="secondary" type="button">
          <Link
            to="/jsonserver/newuserlist"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Back
          </Link>
        </Button>
      </Form>
    </div>
  );
};

export default AddNewUser;
