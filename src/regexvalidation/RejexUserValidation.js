import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ValidationRgx } from "./ValidationRgx";
import axios from "axios";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RejexUserValidation = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const [value, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    technology: [],
  });
  const genderOpt = [
    {
      id: 1,
      optionName: "Male",
      optionValue: "male",
    },
    {
      id: 2,
      optionName: "Female",
      optionValue: "female",
    },
    {
      id: 3,
      optionName: "Other",
      optionValue: "other",
    },
  ];
  const multiOptions = [
    { label: "React", value: "react" },
    { label: "Node", value: "node" },
    { label: "Vue", value: "vue" },
    { label: "Anguler", value: "anguler" },
  ];
  const [errMsg, setErrMsg] = useState({});
  const inputChange = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });
  };
  const selectChange = (opdata) => {
    setValues({ ...value, technology: [...opdata] });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    //setErrMsg(ValidationRgx(value));

    if(!value.username || !value.email || !value.phone || !value.gender || value.technology.length===0){
      console.log('start-')
      setErrMsg(ValidationRgx(value))
    }else{
      console.log('end-')
      const newValue = {
        id: Date.now(),
        employeename: value.username,
        email: value.email,
        phone: value.phone,
        gender: value.gender,
        technology: value.technology,
      };
      axios
        .post(`${baseUrl}/user`, newValue)
        .then((res) => {
          if (res.status === 201) {
            toast.success("User added successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setValues({
              username: "",
              email: "",
              phone: "",
              gender: "",
              technology: [],
            });
            navigate("/jsonserver/newuserlist");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };

  //console.log("value-", value);
  return (
    <div className="my-4">
      <Container>
        <h3 className="text-center">Regex Validation</h3>
        <Form>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Control
                className="my-3"
                name="username"
                placeholder="Name"
                value={value.username}
                onChange={(e) => inputChange(e)}
              />
              {errMsg.username && (
                <span className="text-danger">{errMsg.username}</span>
              )}
              <Form.Control
                className="my-3"
                name="email"
                placeholder="Email"
                value={value.email}
                onChange={(e) => inputChange(e)}
              />
              {errMsg.email && (
                <span className="text-danger">{errMsg.email}</span>
              )}
              <Form.Control
                className="my-3"
                name="phone"
                placeholder="Phone"
                value={value.phone}
                onChange={(e) => inputChange(e)}
              />
              {errMsg.phone && (
                <span className="text-danger">{errMsg.phone}</span>
              )}
              <Form.Select
                className="my-3"
                aria-label="Default select example"
                name="gender"
                value={value.gender}
                onChange={(e) => inputChange(e)}
              >
                <option value="">--Select Gender--</option>
                {genderOpt &&
                  genderOpt.map((user) => {
                    return (
                      <option key={user.id} value={user.optionValue}>
                        {user.optionName}
                      </option>
                    );
                  })}
              </Form.Select>
              {errMsg.gender && (
                <span className="text-danger">{errMsg.gender}</span>
              )}
              <Select
                isMulti
                options={multiOptions}
                components={animatedComponents}
                value={value.technology}
                onChange={(e) => selectChange(e)}
              />
              {errMsg.technology && (
                <span className="text-danger">{errMsg.technology}</span>
              )}
              <br />
              <Button
                type="button"
                className="mt-4 mx-2"
                variant="primary"
                onClick={handelSubmit}
              >
                Save
              </Button>
              <Button type="button" className="mt-4 mx-2" variant="secondary">
                Back
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default RejexUserValidation;
