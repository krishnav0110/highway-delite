"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { UserType, AuthErrorType } from "@/lib/types";





interface AuthContextType {
  user: UserType|null,
  isLoading: boolean,
  error: AuthErrorType|null,
  login: (credentials: { email: string, password: string }) => Promise<void>,
  logout: () => Promise<void>,
};

const AuthContext = React.createContext<AuthContextType|null>(null);



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = React.useState<UserType|null>(null);
  const [isLoading, setLoadingState] = React.useState<boolean>(false);
  const [error, setError] = React.useState<AuthErrorType|null>(null);





  React.useEffect(() => {
    setLoadingState(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      router.push("/");
    }

    setLoadingState(false);
  }, []);





  const login = async (credentials: { email: string, password: string }) => {
    setError(null);
    setLoadingState(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (res.status !== 200) {
        setError(AuthErrorType.SIGNIN_ERROR);
        return;
      }

      const resUser = await res.json();
      setUser(resUser);
      localStorage.setItem("user", JSON.stringify(resUser));
      router.push("/");
    }
    catch (error) {
      setError(AuthErrorType.CLIENT_ERROR);
    }
    finally {
      setLoadingState(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoadingState(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.status !== 200) {
        setError(AuthErrorType.SERVER_ERROR);
        return;
      }

      setUser(null);
      localStorage.removeItem("user");
      router.push("/signin");
    }
    catch (error) {
      setError(AuthErrorType.CLIENT_ERROR);
    }
    finally {
      setLoadingState(false);
    }
  };





  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
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