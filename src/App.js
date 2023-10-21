import './App.css';
import TodoApp from '../src/demoApps/TodoApp';
import NewTodoApp from './demoApps/NewTodoApp';

function App() {
  return (
    <div className="App">
      <h1>React Demo Application</h1>
      <TodoApp />
      {/* <NewTodoApp /> */}
    </div>
  );
}

export default App;
