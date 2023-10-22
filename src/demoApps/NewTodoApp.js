import React, { useState } from 'react';
import './todo.css';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const NewTodoApp = () => {
  const [todoInput, setTodoInput] = useState('');
  const [listTodos, setListTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [editItem, SetEditItem] = useState(true)
  const [updateData, setUpdatedata] = useState(null)

  const addTodo = () => {
    if (todoInput === '' || !todoInput) {
      setErrorMsg('Please fill the field!');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    } else {
      const newData = {
        id: Date.now(),
        todo: todoInput,
      };
      setListTodos([...listTodos, newData]);
      setTodoInput('');
    }
  };

  const EditHandler = (e) => {
    setUpdatedata(e)
    SetEditItem(false)
  }

  return (
    <>
      <Container className='text-center'>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form inline >
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter todo here"
                    name="todoinput"
                    id="todoinput"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button type="submit" onClick={() => addTodo()}
                    disabled={!todoInput} className='w-100'>Submit</Button>

                </Col>
              </Row>
              {
                listTodos.length === 0 ?
                  <h3>No todo available!</h3> :
                  <table className='w-100 my-4'>
                    <thead>
                      <tr>
                        <th>#Sl. No</th>
                        <th>Todo Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {listTodos.map((tdata, index) => {
                      console.log('tdata=>', tdata);
                      return (
                        <tbody key={tdata.id}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{tdata.todo}</td>
                            {
                              !editItem ?
                              <td>
                                <Button onClick={() => addTodo()}
                                  className='w-100'>Edit Now</Button>
                                  <Button variant="danger">Cancel</Button>
                              </td>
                                
                                :
                                <td>
                                  <Button variant="primary">View</Button>
                                  <Button onClick={() => EditHandler(tdata)} variant="success">Edit</Button>
                                  <Button variant="danger">Delete</Button>
                                </td>
                            }

                          </tr>
                        </tbody>
                      );
                    })}
                  </table>

              }
              <Row>
                <Col>

                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

      </Container>

    </>

  );
};

export default NewTodoApp;
