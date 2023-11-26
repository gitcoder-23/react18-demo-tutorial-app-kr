import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { RootLoginApi } from "../RootApi";

const LoginPage = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    useremail: "",
  });

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (!loginState.username || !loginState.useremail) {
      toast.error("Please fill all fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let newFormData = {
        id: Date.now(),
        name: loginState.username,
        email: loginState.useremail,
      };

      RootLoginApi.post("/userlogin", newFormData)
        .then((res) => {
          console.log("res=>", res);
          if (res.status === 201) {
            toast.success("Login successful!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setLoginState({
              username: "",
              useremail: "",
            });
            localStorage.setItem("userdata", JSON.stringify(res.data));
            sessionStorage.setItem("usersessiondata", JSON.stringify(res.data));
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
  };

  return (
    <div className="container">
      <Form onSubmit={(e) => onFormSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Name"
              value={loginState.username}
              onChange={(e) => {
                setLoginState({
                  ...loginState,
                  username: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Email"
              value={loginState.useremail}
              onChange={(e) => {
                setLoginState({
                  ...loginState,
                  useremail: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Row>

        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
