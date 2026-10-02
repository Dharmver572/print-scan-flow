
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:8081/api";

const TOKEN_KEY = "printeasy_token";
const USER_KEY = "printeasy_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser =
        localStorage.getItem(USER_KEY);

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // CHECK AUTH ON APP LOAD
  // =========================
  useEffect(() => {
    const storedToken =
      localStorage.getItem(TOKEN_KEY);

    const storedUser =
      localStorage.getItem(USER_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  // =========================
  // REGISTER
  // =========================
  const register = async (
    name,
    email,
    password
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Registration failed"
      );
    }

    return data;
  };

  // =========================
  // LOGIN
  // =========================
  const login = async (
    email,
    password,
    rememberMe = true
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Login failed"
      );
    }

    // =========================
    // GET TOKEN
    // =========================
    const accessToken =
      data?.data?.token ||
      data?.token ||
      data?.data?.accessToken ||
      data?.accessToken;

    if (!accessToken) {
      throw new Error(
        "Login successful but authentication token was not received."
      );
    }

    // =========================
    // GET USER
    // =========================
    const loggedInUser =
      data?.data?.user ||
      data?.user ||
      data?.data;

    // =========================
    // SAVE TOKEN
    // IMPORTANT:
    // Same key is used by api.js
    // =========================
    localStorage.setItem(
      TOKEN_KEY,
      accessToken
    );

    setToken(accessToken);

    // =========================
    // SAVE USER
    // =========================
    if (
      loggedInUser &&
      typeof loggedInUser === "object"
    ) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);
    }

    return data;
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Remove old key also
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  // =========================
  // AUTHENTICATION STATUS
  // =========================
  const isAuthenticated =
    Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// USE AUTH
// =========================
export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

