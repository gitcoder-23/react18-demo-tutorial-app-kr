import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewSingleWorkers } from "../redux/actions/workerAction";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const WorkerView = () => {
  const { vid } = useParams();
  const navigate = useNavigate();
  // console.log("vid=>", vid);
  const dispatch = useDispatch();
  const { singleWorker } = useSelector((state) => state.worker);

  useEffect(() => {
    dispatch(viewSingleWorkers({ viewId: vid }));
    // dispatch(viewSingleWorkers({ viewId: vid }))
    //   .then((resp) => {
    //     console.log("resp=>", resp.payload);
    //   })
    //   .catch((err) => {
    //     console.log("err=>", err);
    //   });
  }, []);

  return (
    <div>
      {singleWorker && (
        <Card>
          <Card.Header>View Worker</Card.Header>
          <Card.Body>
            <Card.Title>{singleWorker.workername}</Card.Title>
            <Card.Text>{singleWorker.email}</Card.Text>
            <Button variant="primary" onClick={() => navigate("/worker")}>
              Go Back
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default WorkerView;
