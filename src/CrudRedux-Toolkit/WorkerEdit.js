import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editWorker } from "../redux/actions/workerAction";

const WorkerEdit = () => {
  const navigate = useNavigate();
  const { eid } = useParams();
  console.log("eid=>", eid);
  const { state } = useLocation();
  console.log("state=>", state);
  const dispatch = useDispatch();
  const [workerEditField, setWorkerEditField] = useState({
    workerName: state.workerData.workername ?? "",
    workerEmail: state.workerData.email ?? "",
    workerPhone: state.workerData.phone ?? "",
    workerGender: state.workerData.gender ?? "",
  });

  useEffect(() => {}, [state]);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (
      !workerEditField.workerName ||
      !workerEditField.workerEmail ||
      !workerEditField.workerPhone ||
      !workerEditField.workerGender
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let newEditJson = {
        workername: workerEditField.workerName,
        email: workerEditField.workerEmail,
        phone: workerEditField.workerPhone,
        gender: workerEditField.workerGender,
      };

      dispatch(editWorker({ eid: eid, editFormData: newEditJson }))
        .then((resp) => {
          console.log("resp=>", resp);
          if (resp.type === "worker/edit/fulfilled") {
            navigate("/worker");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Form onSubmit={(e) => onFormSubmit(e)}>
      <Form.Group className="mb-3">
        <Form.Label>Worker Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={workerEditField.workerName}
          onChange={(e) => {
            setWorkerEditField({
              ...workerEditField,
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
          value={workerEditField.workerEmail}
          onChange={(e) => {
            setWorkerEditField({
              ...workerEditField,
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
          value={workerEditField.workerPhone}
          onChange={(e) => {
            setWorkerEditField({
              ...workerEditField,
              workerPhone: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Select
        aria-label="Default select example"
        value={workerEditField.workerGender}
        onChange={(e) => {
          setWorkerEditField({
            ...workerEditField,
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
      <Button type="submit" variant="primary">
        Save
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Link type="button" variant="primary" to={"/worker"}>
        Go Back
      </Link>
    </Form>
  );
};

export default WorkerEdit;
