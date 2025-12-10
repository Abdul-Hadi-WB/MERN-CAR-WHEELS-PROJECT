import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
    refreshToken: '',
  });
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('auth'));
    authUser && setAuth(authUser);
  }, []);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};
export default AuthProvider; /// provider - App
export const useAuth = () => useContext(AuthContext); ///// receiver/consumer  useAuth
