import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMeRequest,
  loginRequest,
  logoutRequest,
} from "../services/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const currentUser = await getMeRequest();

        if (currentUser?.role === "ADMIN") {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error comprobando sesión:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  async function login(email, password) {
    const userData = await loginRequest(email, password);

    if (userData.role !== "ADMIN") {
      await logoutRequest().catch(() => {});
      throw new Error("No tienes permisos de administrador");
    }

    setUser(userData);

    return userData;
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user),
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
      "useAuth debe usarse dentro de AuthProvider"
    );
  }

  return context;
}