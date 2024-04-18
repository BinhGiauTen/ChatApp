import React, { useState, useEffect, useContext } from "react";
import ContactSearch from "./ContactSearch";
import { IoIosMore } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import MessageItem from "./MessageItem";
import {useDispatch, useSelector} from "react-redux";
import { getAllConversations } from "../features/message/messageSlice";
import { SocketContext } from "../context/SocketContext";


function FriendList({ showMessageViewHandler, showMessageViewGroupHandler }) {
  const { socket } = useContext(SocketContext);
  const [selectedItem, setSelectedItem] = useState("all");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user);
  const dispatch = useDispatch();
  const getConversationsFromDb = () => {
    if (userState?._id) {
      dispatch(getAllConversations(userState._id));
    }
  };

  useEffect(() => {
    socket?.on("newConversation", (conversation) => {
      console.log("New conversation: ", conversation);
    });

    // return () => {
    //   // Ngắt kết nối socket khi component unmount
    //   socket?.disconnect();
    // };
  }, []);

  useEffect(() => {
    getConversationsFromDb();
  }, [userState?._id]);     // Chỉ gọi lại khi userState._id thay đổi

  const conversationState = useSelector((state) => state?.message?.getAllConversations);
  return (
    <div className="contain">
      <ContactSearch />
      <div className="filter">
        <div>
          <span
            className={`all-contact ${
              selectedItem === "all" ? "selected-filter" : ""
            }`}
            onClick={() => handleItemClick("all")}
          >
            Tất cả
          </span>
          <span
            className={`un-read ${
              selectedItem === "unread" ? "selected-filter" : ""
            }`}
            onClick={() => handleItemClick("unread")}
          >
            Chưa đọc
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className=" group-filter-type">
            <span className="filter-type">Phân loại</span>
            <IoIosArrowDown className="filter-type-icon" />
          </div>
          <IoIosMore className="filter-more-icon" />
        </div>
      </div>
      {selectedItem === "all" && (
        <>
          <MessageItem showMessageViewHandler={showMessageViewHandler} showMessageViewGroupHandler={showMessageViewGroupHandler} data={conversationState ? conversationState : []}/>
        </>
      )}
      {selectedItem === "unread" && (
        <>
          <MessageItem showMessageViewHandler={showMessageViewHandler} showMessageViewGroupHandler={showMessageViewGroupHandler} data={conversationState ? conversationState : []}/>
        </>
      )}
    </div>
  );
}

export default FriendList;
