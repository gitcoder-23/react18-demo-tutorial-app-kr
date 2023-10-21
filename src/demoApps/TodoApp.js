import React, { useState } from 'react';
import './todo.css';

const TodoApp = () => {
  // const [data, callBacck] = useState(type)
  const [todoInput, setTodoInput] = useState('');
  const [listTodos, setListTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

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

  //console.log('listTodos=>', listTodos);

  return (
    <div className="todo_container">
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
            style={{ fontSize: '20px', background: 'blue', color: '#fff' }}
            onClick={() => addTodo()}
            disabled={!todoInput}
          >
            Add
          </button>
        </form>
        <p style={{ color: 'red' }}>{errorMsg}</p>
      </div>

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
              console.log('tdata=>', tdata);
              return (
                <tbody key={tdata.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{tdata.todo}</td>
                    <td>
                      <button> View</button>&nbsp;&nbsp;
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
