import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("printeasy_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("printeasy_token");

    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe = true) => {
    const response = await api.login({
      email,
      password,
    });

    const data = response?.data;

    if (!data) {
      throw new Error("Invalid login response from server");
    }

    const token =
      data.token ||
      data.accessToken ||
      data.jwt ||
      data.access_token;

    if (!token) {
      throw new Error("JWT token was not returned by server");
    }

    const userData = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
      shopId: data.shopId ?? null,
      shopName: data.shopName ?? null,
      shopCode: data.shopCode ?? null,
    };

    if (rememberMe) {
      localStorage.setItem("printeasy_token", token);
      localStorage.setItem(
        "printeasy_user",
        JSON.stringify(userData)
      );
    } else {
      sessionStorage.setItem("printeasy_token", token);
      sessionStorage.setItem(
        "printeasy_user",
        JSON.stringify(userData)
      );
    }

    setUser(userData);

    return response;
  };

  const register = async (name, email, password) => {
    return api.register({
      name,
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("printeasy_token");
    localStorage.removeItem("printeasy_user");

    sessionStorage.removeItem("printeasy_token");
    sessionStorage.removeItem("printeasy_user");

    setUser(null);
  };

  const isAuthenticated =
    !!localStorage.getItem("printeasy_token") ||
    !!sessionStorage.getItem("printeasy_token");

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}