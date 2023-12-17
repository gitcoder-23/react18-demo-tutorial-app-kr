import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudent } from "../redux/actions/studentAction";
import { Table } from "react-bootstrap";
import SpinnerComponent from "../components/SpinnerComponent"

const StudentList = () => {
  const dispatch = useDispatch();
  const {allstudent, isLoading, message} = useSelector((state)=> state.student)
  console.log('allstudent-',allstudent)

  useEffect(() => {
    dispatch(getAllStudent())
  }, [])
  
  return (
    <>
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
          {
            isLoading ?
            <SpinnerComponent/> :
            allstudent.map((data, index)=>{
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.employeename}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                </tr>
              )
            })
          }
          
          
        </tbody>
      </Table>
    </div>
    </>
    
    );
};

export default StudentList;
