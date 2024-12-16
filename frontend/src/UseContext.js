import React, { createContext, useReducer } from "react";

const initialState = {
  name: "",
  isAuthenticated: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        name: action.payload.name,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return initialState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
