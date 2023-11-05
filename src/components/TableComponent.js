import React from 'react';
import { Button, Table } from 'react-bootstrap';

const TableComponent = ({
  userAllDatas,
  search,
  viewUserDetails,
  editUser,
  deleteUser,
  selectUser,
  userSelectData,
  selectButtonDisabled,
}) => {
  console.log('userSelectData=>', userSelectData);
  return (
    <Table striped bordered hover variant="dark" className="mt-4">
      <thead>
        <tr>
          <th>#Sl.No.</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      {userAllDatas &&
        userAllDatas
          .filter((val) => {
            // console.log('val=>', val);
            if (search === '') {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            } else if (val.email.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })

          .map((udata, index) => {
            return (
              <tbody key={udata.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{udata.name}</td>
                  <td>{udata.email}</td>
                  <td>{udata.phone}</td>
                  <td>
                    <Button
                      className="mx-1"
                      variant="success"
                      onClick={() => {
                        viewUserDetails(udata);
                      }}
                    >
                      View
                    </Button>
                    &nbsp;
                    <Button
                      className="mx-1"
                      variant="info"
                      onClick={() => editUser(udata)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      className="mx-1"
                      variant="danger"
                      onClick={() => deleteUser(udata)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="mx-1"
                      variant="light"
                      onClick={() => selectUser(udata)}
                      disabled={userSelectData.some(
                        (selectedItem) => selectedItem.id === udata.id
                      )}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
    </Table>
  );
};

export default TableComponent;
