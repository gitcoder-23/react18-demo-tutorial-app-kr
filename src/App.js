import "./App.css";
import MenuBar from "./components/MenuBar";
import { ToastMessageComponent } from "./components/ToastMessageComponent";
import ComponentRoute from "./ComponentRoute";

function App() {
  return (
    <div className="App container">
      <ToastMessageComponent />
      <MenuBar />
      <h1>React Demo Application</h1>
      <ComponentRoute />
    </div>
  );
}

export default App;
