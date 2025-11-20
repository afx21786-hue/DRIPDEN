import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { onAuthChange, signInWithEmail, signUpWithEmail, signOut, signInWithGoogle } from "./firebase-auth";
import type { User as FirebaseUser } from "firebase/auth";

type User = {
  id: string;
  username: string;
  email: string;
  photoURL?: string;
  dripCoins: number;
};

type AuthContextType = {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthChange((fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        setUser({
          id: fbUser.uid,
          username: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          photoURL: fbUser.photoURL || undefined,
          dripCoins: 0,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmail(email, password);
    queryClient.invalidateQueries();
  }

  async function loginWithGoogle() {
    await signInWithGoogle();
    queryClient.invalidateQueries();
  }

  async function register(email: string, password: string) {
    await signUpWithEmail(email, password);
    queryClient.invalidateQueries();
  }

  async function logout() {
    await signOut();
    setUser(null);
    queryClient.clear();
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, isLoading, login, loginWithGoogle, register, logout }}>
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
