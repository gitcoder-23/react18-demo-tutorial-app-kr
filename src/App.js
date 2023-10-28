import './App.css';
import TodoApp from '../src/demoApps/TodoApp';
import NewTodoApp from './demoApps/NewTodoApp';
import { Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import TaskTodoApp from './demoApps/TaskTodoApp';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <h1>React Demo Application</h1>
      <Routes>
        <Route exact path="/" element={<TodoApp />} />
        <Route exact path="/taskapp" element={<TaskTodoApp/>} />
        <Route exact path="/task/newtodo" element={<NewTodoApp />} />
      </Routes>
    </div>
  );
}

export default App;
