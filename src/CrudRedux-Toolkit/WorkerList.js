import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorker, getAllWorkers } from "../redux/actions/workerAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const editClick = (eData) => {
    navigate(`/worker/edit/${eData.id}`, {
      state: { workerData: eData },
    });
  };

  const deleteClick = (delId) => {
    console.log("delId=>", delId);
    if (window.confirm("Do you want?")) {
      dispatch(deleteWorker(delId))
        .then((resp) => {
          console.log("resp=>", resp);
          if (resp.type === "worker/delete/fulfilled") {
            toast.success("Delete success!", {
              position: toast.POSITION.TOP_RIGHT,
            });

            dispatch(getAllWorkers());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="mt-4">
      <div>
        <Link to={"/workeradd"}>+ Add Worker</Link>
      </div>
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
                    <button onClick={() => editClick(data)}>Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => deleteClick(data.id)}>Delete</button>
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
