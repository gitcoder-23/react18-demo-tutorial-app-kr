import "./App.css";
import TodoApp from "../src/demoApps/TodoApp";
import NewTodoApp from "./demoApps/NewTodoApp";
import { Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import TaskTodoApp from "./demoApps/TaskTodoApp";
import UserList from "./CrudUsingFakeJsonApi/UserList";
import NewUserList from "./CrudRealJsonServer/NewUserList";
import ViewUserDetail from "./CrudRealJsonServer/ViewUserDetail";
import AddNewUser from "./CrudRealJsonServer/AddNewUser";
import { ToastMessageComponent } from "./components/ToastMessageComponent";
import EditNewUser from "./CrudRealJsonServer/EditNewUser";
import RejexUserValidation from "./regexvalidation/RejexUserValidation";
import RegexValidation from "./regexvalidation/RegexValidation";
import RegexViewList from "./regexvalidation/RegexViewList";
import RegSingleList from "./regexvalidation/RegSingleList";
import EditRegexSingleEmploy from "./regexvalidation/EditRegexSingleEmploy";
import AddReactHookForm from "./reactHookForm/AddReactHookForm";

function App() {
  return (
    <div className="App container">
      <ToastMessageComponent />
      <MenuBar />
      <h1>React Demo Application</h1>
      <Routes>
        <Route exact path="/" element={<TodoApp />} />
        <Route exact path="/taskapp" element={<TaskTodoApp />} />
        <Route exact path="/task/newtodo" element={<NewTodoApp />} />
        <Route exact path="/json/usercrud" element={<UserList />} />

        {/* CRUD App Using JSON Server */}
        <Route exact path="/jsonserver/newuserlist" element={<NewUserList />} />
        <Route exact path="/jsonserver/add/newuser" element={<AddNewUser />} />
        <Route
          exact
          path="/jsonserver/edituser/:eid"
          element={<EditNewUser />}
        />
        <Route
          exact
          path="/jsonserver/viewuser/:vid"
          element={<ViewUserDetail />}
        />
        <Route exact path="/validation/regexvalidation" element={<RejexUserValidation/>} />

        <Route exac path='/regexvalidation' element={<RegexValidation/>} />
        <Route exac path='/regexvalidation/viewlist' element={<RegexViewList/>} />
        <Route exac path='/regexvalidation/viewlist/:empID' element={<RegSingleList/>} />
        <Route exac path='/regexvalidation/viewlist/edit/:id' element={<EditRegexSingleEmploy/>} />

        <Route exac path='/reacthookform/addemployee' element={<AddReactHookForm/>} />
      </Routes>
    </div>
  );
}

export default App;
