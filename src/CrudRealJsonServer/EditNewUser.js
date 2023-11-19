import axios from "axios";
import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const EditNewUser = () => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const { eid } = useParams();

  const { state } = useLocation();

  const [userFormEditState, setUserFormEditState] = useState({
    userName: state.singleUser.employeename || "",
    userEmail: state.singleUser.email || "",
    userPhone: state.singleUser.phone || "",
    userGender: state.singleUser.gender || "",
    technology: state.singleUser.technology || [],
    userPerformance: state.singleUser.performance || "",
    userDetails: state.singleUser.details || "",
    userStatus: state.singleUser.status || false,
  });

  const onInputChange = (evt) => {
    setUserFormEditState({
      ...userFormEditState,
      [evt.target.name]: evt.target.value,
    });
  };

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
    // console.log("optionData=>", optionData);
    setUserFormEditState({
      ...userFormEditState,
      technology: [...optionData],
    });
  };

  const genderData = [
    {
      id: 1,
      gname: "Male",
      gvale: "male",
    },
    {
      id: 2,
      gname: "Female",
      gvale: "female",
    },
    {
      id: 3,
      gname: "Others",
      gvale: "others",
    },
  ];

  const editSave = () => {
    if (
      !userFormEditState.userName ||
      !userFormEditState.userEmail ||
      !userFormEditState.userPhone ||
      !userFormEditState.userGender ||
      userFormEditState.technology.length === 0 ||
      !userFormEditState.userPerformance ||
      !userFormEditState.userDetails
      // ||
      // userFormEditState.userStatus === false
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const newData = {
        employeename: userFormEditState.userName,
        email: userFormEditState.userEmail,
        phone: userFormEditState.userPhone,
        gender: userFormEditState.userGender,
        technology: userFormEditState.technology,
        performance: userFormEditState.userPerformance,
        details: userFormEditState.userDetails,
        status: userFormEditState.userStatus,
      };
      axios
        .put(`${baseUrl}/user/${eid}`, newData)
        .then((eresponse) => {
          console.log("eresponse=>", eresponse);
          if (eresponse.status === 200) {
            toast.success("Edit done!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/jsonserver/newuserlist");
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
  };
  console.log(
    "userFormEditState.userDetails==>",
    userFormEditState.userDetails
  );
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
                name="userName"
                value={userFormEditState.userName}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="userEmail"
                value={userFormEditState.userEmail}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="userPhone"
                value={userFormEditState.userPhone}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="userGender"
                value={userFormEditState.userGender}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">--Select One--</option>
                {genderData.map((gdata, i) => {
                  return (
                    <option key={gdata.id} value={gdata.gvale}>
                      {gdata.gname}
                    </option>
                  );
                })}
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
                value={userFormEditState.technology}
                onChange={(e) => onSelectChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group className="mb-3">
              <Form.Label>Employee Performance</Form.Label>
              <br />
              <Form.Check
                inline
                label="Good"
                name="userPerformance"
                value="good"
                type="radio"
                onChange={(e) => onInputChange(e)}
                checked={
                  userFormEditState.userPerformance === "good" ? true : false
                }
              />
              &nbsp;&nbsp;&nbsp;
              <Form.Check
                inline
                label="Better"
                name="userPerformance"
                value="better"
                type="radio"
                onChange={(e) => onInputChange(e)}
                checked={
                  userFormEditState.userPerformance === "better" ? true : false
                }
              />
              &nbsp;&nbsp;&nbsp;
              <Form.Check
                inline
                label="Best"
                name="userPerformance"
                value="best"
                type="radio"
                onChange={(e) => onInputChange(e)}
                checked={
                  userFormEditState.userPerformance === "best" ? true : false
                }
              />
              &nbsp;&nbsp;&nbsp;
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
                  name="userDetails"
                  value={userFormEditState.userDetails}
                  onChange={(e) => onInputChange(e)}
                />
              </FloatingLabel>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>User Status</Form.Label>{" "}
              <Form.Check
                inline
                label={
                  userFormEditState.userStatus === true
                    ? "Active User"
                    : "Inactive User"
                }
                name="userStatus"
                type="checkbox"
                value=""
                checked={userFormEditState.userStatus}
                onChange={(e) =>
                  setUserFormEditState({
                    ...userFormEditState,
                    userStatus: e.target.checked,
                  })
                }
              />
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="button" onClick={() => editSave()}>
          Save
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

export default EditNewUser;
