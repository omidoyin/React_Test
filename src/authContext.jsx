import React, { useCallback, useReducer, useState } from "react";
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
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
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
      type: "Logout",
    });
    // below is causing a re-render of the page so i replaced it with window.pushState.
    // window.location.href = "/" + role + "/login";
    const newUrl = `/${role}/login`;
    history.pushState({}, null, newUrl);
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [statusMessage, setStatusMessage] = useState();

  const mem = useCallback(
    () => tokenExpireError(dispatch, statusMessage),
    [statusMessage]
  );

  React.useEffect(() => {
    //TODO
    // done
    const checkVerifyAuth = async () => {
      try {
        const authStatus = await sdk.check(state.role);
        setStatusMessage(authStatus.message);
        if (authStatus.error == true && !state.token && !state.role) {
          mem();
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    checkVerifyAuth();
  }, [mem, state]);

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
