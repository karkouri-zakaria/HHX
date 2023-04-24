import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.user._id);
    localStorage.setItem("name", data.user.Nom)
    localStorage.setItem("role", data.user.Fonction)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("role")
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, login: login, logout: logout}} >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
