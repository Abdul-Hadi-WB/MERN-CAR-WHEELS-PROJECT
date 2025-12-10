import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
    refreshToken: '',
  });
  
  const [loading, setLoading] = useState(true); // ✅ ADD LOADING STATE

  useEffect(() => {
    console.log("🔄 AuthProvider: Loading auth from localStorage...");
    
    try {
      const authData = localStorage.getItem('auth');
      
      if (authData) {
        console.log("✅ AuthProvider: Found auth in localStorage");
        const parsedAuth = JSON.parse(authData);
        setAuth(parsedAuth);
      } else {
        console.log("❌ AuthProvider: No auth in localStorage");
      }
    } catch (error) {
      console.error("❌ AuthProvider: Error loading auth:", error);
    } finally {
      // ✅ CRITICAL: Set loading to false after checking
      setLoading(false);
      console.log("✅ AuthProvider: Loading complete");
    }
  }, []);

  // ✅ Return auth, setAuth, AND loading
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Update useAuth hook to return object
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthProvider;