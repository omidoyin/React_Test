import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";

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
          <Route
            index
            exact
            path="/admin/login"
            element={<AdminLoginPage />}
          ></Route>
          <Route path="/*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { dispatch, state } = React.useContext(AuthContext);
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          {/* displayed NavBar at the Top level */}
          <NavBar />
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
