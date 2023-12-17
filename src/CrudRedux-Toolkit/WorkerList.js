import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkers } from "../redux/actions/workerAction";
import { useNavigate } from "react-router-dom";

const WorkerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allWorkers, isLoading } = useSelector((state) => state.worker);

  console.log("isLoading=>", isLoading);

  useEffect(() => {
    dispatch(getAllWorkers());
  }, []);

  const viewClick = (vdata) => {
    navigate(`/worker/view/${vdata.id}`);
  };

  return (
    <div className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#Sl.No</th>
            <th>Worker</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        {allWorkers &&
          allWorkers.map((data, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{data.workername}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.gender}</td>
                  <td>
                    <button onClick={() => viewClick(data)}>View</button>
                    &nbsp;&nbsp;&nbsp;
                    <button>Edit</button>&nbsp;&nbsp;&nbsp;
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
};

export default WorkerList;
