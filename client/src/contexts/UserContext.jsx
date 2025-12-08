import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setAccessToken(storedToken);
  }, []);


  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);
  };


  const register = (userData, token) => {
    login(userData, token);
  };


  const logout = () => {
    setUser(null);
    setAccessToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
   const context =  useContext(UserContext);

   return context;
};

export default UserContext;
