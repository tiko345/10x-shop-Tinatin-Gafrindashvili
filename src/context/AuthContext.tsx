import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
//defines the structure of the object 
interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

//shared context for authentication state and functions
const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
//provides authentication state and functions to its children
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  function login(username: string) {
    setUser(username);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
//custom hook to access authentication context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}