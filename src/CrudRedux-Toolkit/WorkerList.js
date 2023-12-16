import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkers } from "../redux/actions/workerAction";

const WorkerList = () => {
  const dispatch = useDispatch();

  const { allWorkers, isLoading } = useSelector((state) => state.worker);

  console.log("isLoading=>", isLoading);

  useEffect(() => {
    dispatch(getAllWorkers());
  }, []);

  return (
    <div className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default WorkerList;
