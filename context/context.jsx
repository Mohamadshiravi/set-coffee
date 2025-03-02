"use client";

import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const FETCH_USER_DATA = "SET_USER_DATA";

function UserReducer(state, action) {
  switch (action.type) {
    case FETCH_USER_DATA: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}

const initialState = {
  user: null,
  wishLength: 0,
  userCart: [],
  loading: true,
  error: null,
};

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  async function FetchUserData() {
    try {
      const userData = {};

      const res = await axios.get("/api/auth/me");

      userData.loading = false;
      userData.userCart = JSON.parse(localStorage.getItem("cart")) || [];
      userData.user = res.data.theUser;
      userData.wishLength = res.data.wishLength;

      dispatch({ type: FETCH_USER_DATA, payload: userData });
    } catch (error) {
      const userData = {
        user: null,
        wishLength: 0,
        userCart: [],
        loading: false,
        error: "unAuth",
      };
      dispatch({ type: FETCH_USER_DATA, payload: userData });
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        wishLength: state.wishLength,
        userCart: state.userCart,
        loading: state.loading,
        error: state.error,
        FetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
