import axios from "axios";
import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Link, useNavigate } from "react-router-dom";

const AddNewUser = () => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const [userFormState, setUserFormState] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userGender: "",
    technology: [],
    userPerformance: "",
    userDetails: "",
  });
  const techOptions = [
    {
      value: "angular",
      label: "Angular",
    },
    {
      value: "node",
      label: "Node",
    },
    {
      value: "react",
      label: "React",
    },
    {
      value: "vue",
      label: "Vue",
    },
  ];

  const onSelectChange = (optionData) => {
    console.log("optionData=>", optionData);
    setUserFormState({
      ...userFormState,
      technology: [...optionData],
    });
  };

  const onRadioChange = (radEvt) => {
    // console.log("radioVal=>", radEvt.target.value);
    setUserFormState({
      ...userFormState,
      userPerformance: radEvt.target.value,
    });
  };

  // console.log("userFormState=>", userFormState.userPerformance);

  const addNewUser = () => {
    if (
      !userFormState.userName ||
      !userFormState.userEmail ||
      !userFormState.userPhone ||
      !userFormState.userGender ||
      userFormState.technology.length === 0 ||
      !userFormState.userPerformance ||
      !userFormState.userDetails
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
        technology: userFormState.technology,
        performance: userFormState.userPerformance,
        details: userFormState.userDetails,
      };
      axios
        .post(`${baseUrl}/user/`, newData)
        .then((addRsp) => {
          console.log("addRsp=>", addRsp);
          if (addRsp.status === 201) {
            toast.success("User saved successful!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setUserFormState({
              userName: "",
              userEmail: "",
              userPhone: "",
              userGender: "",
              technology: [],
            });
            navigate("/jsonserver/newuserlist");
          }
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
        <div className="row">
          <div className="col-md-4">
            <Form.Group className="mb-3">
              <Form.Label>Technology</Form.Label>
              <Select
                isMulti
                options={techOptions}
                components={animatedComponents}
                onChange={(option) => onSelectChange(option)}
              />
            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group className="mb-3">
              <Form.Label>User Performance</Form.Label>
              <br />
              <Form.Check
                inline
                label="Good"
                name="Good"
                value="good"
                type="radio"
                onChange={(e) => onRadioChange(e)}
                checked={
                  userFormState.userPerformance === "good" ? true : false
                }
              />

              <Form.Check
                inline
                label="Better"
                name="Better"
                value="better"
                type="radio"
                onChange={(e) => onRadioChange(e)}
                checked={
                  userFormState.userPerformance === "better" ? true : false
                }
              />

              <Form.Check
                inline
                label="Best"
                name="Best"
                value="best"
                type="radio"
                onChange={(e) => onRadioChange(e)}
                checked={
                  userFormState.userPerformance === "best" ? true : false
                }
              />
            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group className="mb-3">
              <Form.Label>User Details</Form.Label>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Write details here"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Write details here"
                  value={userFormState.userDetails}
                  onChange={(e) => {
                    setUserFormState({
                      ...userFormState,
                      userDetails: e.target.value,
                    });
                  }}
                />
              </FloatingLabel>
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
