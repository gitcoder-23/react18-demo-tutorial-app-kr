import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ViewUserDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('state=>', state);
  const { vid } = useParams();
  // console.log('vid=>', vid);

  const [viewSngleUser, setViewSngleUser] = useState(null);

  const getSingleUserData = () => {
    axios
      .get(`${process.env.REACT_APP_JSON_SERVER_BASE_URL}/user/${vid}`)
      .then((resp) => {
        console.log('resp=>', resp);
        setViewSngleUser(resp.data);
      })
      .catch((err) => {
        console.log('err=>', vid);
      });
  };

  useEffect(() => {
    getSingleUserData();

    return () => {
      getSingleUserData();
    };
  }, []);

  return (
    <>
      <Card>
        <Card.Header as="h5">User Detail Using useParams</Card.Header>
        <Card.Body>
          <Card.Title>{viewSngleUser?.employeename}</Card.Title>
          <Card.Text>
            <div>
              <h4>Email: {viewSngleUser?.email}</h4>
              <h4>Email: {viewSngleUser?.gender}</h4>
              <h4>Email: {viewSngleUser?.phone}</h4>
            </div>
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => navigate('/jsonserver/newuserlist')}
          >
            Go Back
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h5">User Detail Using useLocation</Card.Header>
        <Card.Body>
          <Card.Title>{state.singleUser.employeename}</Card.Title>
          <Card.Text>
            <div>
              <h4>Email: {state.singleUser.email}</h4>
              <h4>Email: {state.singleUser.gender}</h4>
              <h4>Email: {state.singleUser.phone}</h4>
            </div>
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => navigate('/jsonserver/newuserlist')}
          >
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewUserDetail;
