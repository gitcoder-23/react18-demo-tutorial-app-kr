import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const NewUserList = () => {
  const [allUSerDatas, setAllUSerDatas] = useState([]);
  const getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_JSON_SERVER_BASE_URL}/user`)
      .then((resp) => {
        console.log('resp=>', resp);
        setAllUSerDatas(resp.data.reverse());
      })
      .catch((err) => {
        console.log('err=>', err);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container">
      <h2>CRUD Using Json Sever</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
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
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
};

export default NewUserList;
