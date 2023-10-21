import React, { useState } from 'react';
import './todo.css';

const TodoApp = () => {
  // const [data, callBacck] = useState(type)
  const [todoInput, setTodoInput] = useState('');
  const [listTodos, setListTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // For View
  const [viewTodo, setViewTodo] = useState(null);

  // console.log('todoInput=>', todoInput);

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

  const viewClick = (vdata) => {
    console.log('vdata=>', vdata);
    setViewTodo(vdata);

    setTimeout(() => {
      setViewTodo(null);
    }, 2000);
  };

  console.log('viewTodo=>', viewTodo);

  return (
    <div className="container todo_container">
      <div className="input_head">
        <form>
          <input
            style={{ fontSize: '20px' }}
            type="text"
            name="todoinput"
            id="todoinput"
            value={todoInput}
            placeholder="Enter todo here"
            onChange={(e) => setTodoInput(e.target.value)}
          />
          &nbsp;
          <button
            type="button"
            style={{
              fontSize: '20px',
              background: !todoInput ? 'gray' : 'blue',
              color: '#fff',
            }}
            onClick={() => addTodo()}
            disabled={!todoInput}
          >
            Add
          </button>
        </form>
        <p style={{ color: 'red' }}>{errorMsg}</p>
      </div>

      {viewTodo ? (
        <div className="container">
          <h3>View Todo</h3>
          <p>{viewTodo.todo}</p>
        </div>
      ) : (
        <div></div>
      )}

      {listTodos.length === 0 ? (
        <h3>No todo available!</h3>
      ) : (
        <div className="main_table">
          <table>
            <thead>
              <tr>
                <th>#Sl. No</th>
                <th>Todo Name</th>
                <th>Action</th>
              </tr>
            </thead>
            {listTodos.map((tdata, index) => {
              // console.log('tdata=>', tdata);
              return (
                <tbody key={tdata.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{tdata.todo}</td>
                    <td>
                      <button onClick={() => viewClick(tdata)}> View</button>
                      &nbsp;&nbsp;
                      <button> Edit</button>&nbsp;&nbsp;
                      <button> Delete</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
