import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addWorker } from "../redux/actions/workerAction";

const WorkerAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [workerField, setWorkerField] = useState({
    workerName: "",
    workerEmail: "",
    workerPhone: "",
    workerGender: "",
  });

  const onAddClick = () => {
    console.log("workerField=>", workerField);
    if (
      !workerField.workerName ||
      !workerField.workerEmail ||
      !workerField.workerPhone ||
      !workerField.workerGender
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let newFormJson = {
        id: Date.now(),
        workername: workerField.workerName,
        email: workerField.workerEmail,
        phone: workerField.workerPhone,
        gender: workerField.workerGender,
      };
      dispatch(addWorker({ workerData: newFormJson }))
        .then((res) => {
          console.log("res=>", res);
          if (res.type === "worker/post/fulfilled") {
            toast.success("New worker added!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/worker");
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
  };
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Worker Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={workerField.workerName}
          onChange={(e) => {
            setWorkerField({
              ...workerField,
              workerName: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={workerField.workerEmail}
          onChange={(e) => {
            setWorkerField({
              ...workerField,
              workerEmail: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Phone"
          value={workerField.workerPhone}
          onChange={(e) => {
            setWorkerField({
              ...workerField,
              workerPhone: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Select
        aria-label="Default select example"
        value={workerField.workerGender}
        onChange={(e) => {
          setWorkerField({
            ...workerField,
            workerGender: e.target.value,
          });
        }}
      >
        <option value="">--Select--</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </Form.Select>
      <br />
      <Button type="button" variant="primary" onClick={() => onAddClick()}>
        Submit
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Link type="button" variant="primary" to={"/worker"}>
        Go Back
      </Link>
    </Form>
  );
};

export default WorkerAdd;
