import React, { useEffect, useContext } from "react";
import MainTab from "./MainTab";
import { Outlet } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";


function Layout() {
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    // socket.emit("join", conversationState?._id);
    socket?.on("newMessage", (newMessage) => {
      console.log("Newmessage:", newMessage);
      // if (Array.isArray(newMessage)) {
      //   newMessage.forEach(() => {
      //     dispatch(getGroupChatMessages(conversationState?._id));
      //   });
      // } else {
      // console.log("COnversationState:", newMessage?.conversationId);
      // dispatch(getGroupChatMessages(newMessage?.conversationId));
      // }
    });
    socket?.on("newConversation", (newConversation) => {
      console.log("newConversation in app.js:", newConversation);
      // if (Array.isArray(newMessage)) {
      //   newMessage.forEach(() => {
      //     dispatch(getGroupChatMessages(conversationState?._id));
      //   });
      // } else {
      // console.log("COnversationState:", newMessage?.conversationId);
      // dispatch(getGroupChatMessages(newMessage?.conversationId));
      // }
    });

    // console.log("Conversation State 2:", conversationState);

    // return () => {
    //   // Ngắt kết nối socket khi component unmount
    //   socket?.disconnect();
    // };
  }, []);
  return (
    <div className="layout">
      <MainTab />
      <Outlet />
    </div>
  );
}

export default Layout;
