import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';

const UserList = () => {
  const [userAllDatas, setUserAllDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getAllUsers = () => {
    setIsLoading(true);
    // Async OPS
    axios
      .get(`${process.env.REACT_APP_JSON_BASE_URL}/users`)
      .then((response) => {
        console.log('response=>', response);
        if (response.status === 200) {
          setUserAllDatas(response.data);
          setIsLoading(false);
          setIsError(false);
        }
      })
      .catch((err) => {
        console.log('err=>', err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // console.log('userAllDatas-=>', userAllDatas);

  return (
    <div className="container">
      <h2>Json API CRUD</h2>
      {isLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : isError ? (
        <h4 style={{ color: 'red' }}> Something went wrong!</h4>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#Sl.No.</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          {userAllDatas &&
            userAllDatas.map((udata) => {
              return (
                <tbody key={udata.id}>
                  <tr>
                    <td>{udata.id}</td>
                    <td>{udata.name}</td>
                    <td>{udata.email}</td>
                    <td>{udata.phone}</td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      )}
    </div>
  );
};

export default UserList;
