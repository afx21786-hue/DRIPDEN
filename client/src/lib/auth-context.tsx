import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "./api";
import { useQueryClient } from "@tanstack/react-query";

type User = {
  id: string;
  username: string;
  dripCoins: number;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await api.auth.me();
      if (response?.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(username: string, password: string) {
    const response = await api.auth.login(username, password);
    setUser(response.user);
    queryClient.invalidateQueries();
  }

  async function register(username: string, password: string) {
    const response = await api.auth.register(username, password);
    setUser(response.user);
    queryClient.invalidateQueries();
  }

  async function logout() {
    await api.auth.logout();
    setUser(null);
    queryClient.clear();
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
