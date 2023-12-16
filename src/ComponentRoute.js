import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import MenuBar from "./components/MenuBar";
import RegexValidation from "./regexvalidation/RegexValidation";
import RegexViewList from "./regexvalidation/RegexViewList";
import RegSingleList from "./regexvalidation/RegSingleList";
import EditRegexSingleEmploy from "./regexvalidation/EditRegexSingleEmploy";
import AddReactHookForm from "./reactHookForm/AddReactHookForm";
import WorkerList from "./CrudRedux-Toolkit/WorkerList";

const ComponentRoute = () => {
  // useEffect(() => {
  //   const getStorageUserData = JSON.parse(localStorage.getItem("userdata"));

  //   console.log("getStorageUserData=>", getStorageUserData);
  // }, []);

  function PrivateRoute({ children }) {
    const getStorageUserData = JSON.parse(localStorage.getItem("userdata"));
    console.log("pri-getStorageUserData=>", getStorageUserData);
    return getStorageUserData !== null ? (
      <>{children}</>
    ) : (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  function PublicRoute({ children }) {
    const getStorageUserData = JSON.parse(localStorage.getItem("userdata"));
    console.log("pub-getStorageUserData=>", getStorageUserData);
    return getStorageUserData === null ? (
      <>{children}</>
    ) : (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <>
      <PrivateRoute>
        <MenuBar />
      </PrivateRoute>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <TodoApp />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/taskapp"
          element={
            <PrivateRoute>
              <TaskTodoApp />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/task/newtodo"
          element={
            <PrivateRoute>
              <NewTodoApp />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/json/usercrud"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        {/* CRUD App Using JSON Server */}
        <Route
          exact
          path="/jsonserver/newuserlist"
          element={
            <PrivateRoute>
              <NewUserList />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/jsonserver/add/newuser"
          element={
            <PrivateRoute>
              <AddNewUser />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/jsonserver/edituser/:eid"
          element={
            <PrivateRoute>
              <EditNewUser />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/jsonserver/viewuser/:vid"
          element={
            <PrivateRoute>
              <ViewUserDetail />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/validation/regexvalidation"
          element={
            <PrivateRoute>
              <RejexUserValidation />
            </PrivateRoute>
          }
        />
        <Route exac path='/regexvalidation' element={<RegexValidation/>} />
        <Route exac path='/regexvalidation/viewlist' element={<RegexViewList/>} />
        <Route exac path='/regexvalidation/viewlist/:empID' element={<RegSingleList/>} />
        <Route exac path='/regexvalidation/viewlist/edit/:id' element={<EditRegexSingleEmploy/>} />

        <Route exac path='/reacthookform/addemployee' element={<AddReactHookForm/>} />
        <Route
          exact
          path="/worker"
          element={
            <PrivateRoute>
              <WorkerList />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default ComponentRoute;
