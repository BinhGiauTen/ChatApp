import React, { createContext, useState, useEffect, useContext } from "react";
import { base_url } from "../utils/base_url";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );

  useEffect(() => {
    if (user) {
      const socket = io(base_url, {
        query: {
          userId: user._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
