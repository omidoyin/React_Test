import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="/*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { dispatch, state } = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className=" flex justify-evenly border-4 p-6">
            <button className="border-2 px-3 bg-black rounded-lg text-gray-200"
              onClick={() => {
                navigate("/admin/login");
              }}
            >
              Login
            </button>
            <button
             className="border-2 px-3 bg-black rounded-lg text-gray-200"
              onClick={() => {
                dispatch({ type: "LOGOUT" });
              }}
            >
              LogOut
            </button>
          </div>
          <div className="page-wrapper w-full py-10 px-5">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
