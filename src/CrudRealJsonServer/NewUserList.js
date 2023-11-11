import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

const NewUserList = () => {
  const navigate = useNavigate();
  const [allUSerDatas, setAllUSerDatas] = useState([]);
  const getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_JSON_SERVER_BASE_URL}/user`)
      .then((resp) => {
        // console.log('resp=>', resp);
        setAllUSerDatas(resp.data.reverse());
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const viewClick = (vdata) => {
    // console.log('vdata=>', vdata);
    navigate(`/jsonserver/viewuser/${vdata.id}`, {
      state: { singleUser: vdata },
    });
  };

  const deleteClick = (dData) => {
    if (window.confirm("Do you want?")) {
      axios
        .delete(`${baseUrl}/user/${dData.id}`)
        .then((resp) => {
          console.log("resp=>", resp);
          getAllUsers();
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
  };

  const addUser = () => {
    navigate("/jsonserver/add/newuser");
  };

  return (
    <div className="container">
      <h2>CRUD Using Json Sever</h2>
      <button className="btn btn-primary m-4" onClick={() => addUser()}>
        Add User +
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <td>Action</td>
          </tr>
        </thead>
        {allUSerDatas &&
          allUSerDatas.map((udata, index) => {
            return (
              <tbody key={udata.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{udata.employeename}</td>
                  <td>{udata.email}</td>
                  <td>{udata.phone}</td>
                  <td>{udata.gender}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => viewClick(udata)}
                    >
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-warning" onClick={() => {}}>
                      Edit
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteClick(udata)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
};

export default NewUserList;
