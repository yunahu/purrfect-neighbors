import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

import { AuthContext } from "./useAuth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const response = await fetch("http://localhost:3000/user", {
        credentials: "include"
      });
      if (response.status === 200) {
        const resp = await response.json();
        setUser(resp);

        // const path =
        //   new URLSearchParams(window.location.search).get("redirectUrl") || "/";
        // if (window.location.pathname === "/signin" && resp) {
        //   navigate(path);
        // }
      }
    };

    run();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:3000/logout", {
      credentials: "include"
    });
    setUser(null);
  };

  const updateUsername = async (newUsername) => {
    const response = await fetch("http://localhost:3000/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newUsername }),
      credentials: "include"
    });
    if (response.status === 200) {
      setUser((prev) => ({ ...prev, name: newUsername }));
    } else {
      const err = await response.text();
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, updateUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
