import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

const NavBar = () => {
  // const[role]
  const { dispatch, state } = React.useContext(AuthContext);
  const role = state.role;
  const token = state.token;
  const navigate = useNavigate();
  const viewNavigate = (newRoute) => {
    // Navigate to the new route
    if (!document.startViewTransition) {
      return navigate(newRoute);
    } else {
      return document.startViewTransition(() => {
        navigate(newRoute);
      });
    }
  };
  return (
    <div className=" flex justify-evenly border-4 p-6">
      <button
        className="border-2 px-3 bg-black rounded-lg text-gray-200"
        onClick={() => {
          viewNavigate("/admin/login");
        //   navigate("/admin/login");
        }}
        style={{ backgroundColor: token && "gray" }}
        disabled={token}
      >
        Login
      </button>
      <button
        className="border-2 px-3 bg-black rounded-lg text-gray-200"
        onClick={() => {
          dispatch({ type: "LOGOUT" });
          viewNavigate("/admin/login");
        }}
        style={{ backgroundColor: !role && "gray" }}
        disabled={!role}
      >
        LogOut
      </button>
    </div>
  );
};

export default NavBar;
