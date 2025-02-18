"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wishLength, setWishLength] = useState(0);
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function FetchUserData() {
    try {
      setLoading(true);

      setUserCart(JSON.parse(localStorage.getItem("cart")) || []);
      const userDetails = await axios.get("/api/auth/me");
      setUser(userDetails.data.theUser);
      setWishLength(userDetails.data.wishLength);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, wishLength, userCart, loading, FetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}
