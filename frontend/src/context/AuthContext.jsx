import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// ✅ Provides authentication data across the entire app
export const AuthProvider = ({ children }) => {
  // Load from localStorage (if user already logged in)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    return token && email ? { token, email } : null;
  });

  // ✅ Keep localStorage in sync with `user` state
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("userEmail", user.email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    }
  }, [user]);

  // ✅ Functions for login and logout
  const login = (token, email) => setUser({ token, email });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
