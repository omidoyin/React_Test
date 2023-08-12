import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      // done
      localStorage.setItem("role", action.payload.newdata.role);
      localStorage.setItem("token", action.payload.newdata.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.newdata.user_id,
        token: action.payload.newdata.token,
        role: action.payload.newdata.role,
      };
    case "LOGOUT":
      localStorage.clear();
      window.location.href = "/" + "admin" + "/login";
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
      // type: "Logout",
      // i changed it to Upper case
    });
    // below is already implemented in the LOGOUT case above so it can be removed from here
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    // done
    const checkVerifyAuth = async () => {
      try {
        const authStatus = await sdk.check(state.role);
        console.log(authStatus);
        if (authStatus.error) {
          // if error, call the below funtion
          tokenExpireError(dispatch, err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    checkVerifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
