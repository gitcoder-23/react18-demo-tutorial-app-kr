import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoApp from "./demoApps/TodoApp";
import TaskTodoApp from "./demoApps/TaskTodoApp";
import NewTodoApp from "./demoApps/NewTodoApp";
import UserList from "./CrudUsingFakeJsonApi/UserList";
import NewUserList from "./CrudRealJsonServer/NewUserList";
import AddNewUser from "./CrudRealJsonServer/AddNewUser";
import EditNewUser from "./CrudRealJsonServer/EditNewUser";
import ViewUserDetail from "./CrudRealJsonServer/ViewUserDetail";
import RejexUserValidation from "./regexvalidation/RejexUserValidation";
import Login from "./login/LoginPage";

const ComponentRoute = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<TodoApp />} />
        <Route exact path="/login" element={<Login />} />
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
        <Route
          exact
          path="/validation/regexvalidation"
          element={<RejexUserValidation />}
        />
      </Routes>
    </>
  );
};

export default ComponentRoute;
