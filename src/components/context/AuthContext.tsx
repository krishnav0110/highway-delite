"use client";
import * as React from "react";





interface UserType {
  _id: string,
  email: string,
  name: string,
  dob?: string,
};

interface AuthContextType {
  user: UserType|null,
  login: (user: {}) => void,
  logout: () => void,
};

const AuthContext = React.createContext<AuthContextType|null>(null);



export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = React.useState<UserType|null>(null);





  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);





  const login = (user: {}) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("user");
  };





  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};





export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};