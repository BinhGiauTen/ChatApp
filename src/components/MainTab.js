import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsChatTextFill } from "react-icons/bs";
import { MdOutlinePermContactCalendar, MdOutlineCloud } from "react-icons/md";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import ModalSetting from "./ModalSetting";
import ModalProfile from "./ModalProfile";
import {useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { getAllConversations } from "../features/message/messageSlice";

function MainTab() {
  const { socket } = useContext(SocketContext);
  const [selectedItem, setSelectedItem] = useState("message");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const [showModalSetting, setShowModalSetting] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const handleSettingsClick = () => {
    setShowModalSetting(true);
  };

  const handleProfileClick = () => {
    setShowModalProfile(true);
  };

  const handleCloseSettingModal = () => {
    console.log("handleCloseSettingModal is called");
    setShowModalSetting(false);
  };

  const handleCloseModalProfile = () => {
    setShowModalProfile(false);
  };
  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user)
  const avatarSrc = userState?.avatar === "https://example.com/cute-pusheen.jpg" ? "images/avatar-default.jpg" : userState?.avatar;

  const dispatch = useDispatch();

  console.log("Main tab is render");
  useEffect(()=>{
    socket?.on("newConversation", (newConversation) => {
      console.log("New conversation after send messgage:", newConversation);
      dispatch(getAllConversations(userState?._id))
    });

    socket?.on("newMessage", (newMessage) => {
      console.log("New message in group:", newMessage);
    });
  })
  return (
    <>
      <div className="main-tab">
        <div className="avatar" onClick={handleProfileClick}>
          <img
            // src="https://s120-ava-talk.zadn.vn/4/4/a/2/1/120/9207b2750ba3206d04791ae71ad00a1e.jpg"
            src={avatarSrc}
            alt=""
            className="avatar-img"
          />
        </div>
        <div className="tab">
          <div className="top-tab">
            <div
              className={`navlink ${
                selectedItem === "message" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("message")}
            >
              <NavLink to="/">
                <BsChatTextFill className="nav-icon" />
              </NavLink>
            </div>
            <div
              className={`navlink ${
                selectedItem === "contact" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("contact")}
            >
              <NavLink to="/contact">
                <MdOutlinePermContactCalendar className="nav-icon" />
              </NavLink>
            </div>
            <div
              className={`navlink ${selectedItem === "todo" ? "selected" : ""}`}
              onClick={() => handleItemClick("todo")}
            >
              <NavLink to="/todo">
                <FaRegSquareCheck className="nav-icon" />
              </NavLink>
            </div>
          </div>
          <div className="bottom-tab">
            <div className="navlink ">
              <NavLink to="/">
                <MdOutlineCloud className="nav-icon" />
              </NavLink>
            </div>
            <div className="navlink ">
              <NavLink to="/">
                <IoBagHandle className="nav-icon" />
              </NavLink>
            </div>
            <div className="navlink " onClick={handleSettingsClick}>
              <IoMdSettings className="nav-icon" />
            </div>
          </div>
        </div>
        {showModalSetting && <ModalSetting handleCloseSettingModal={handleCloseSettingModal}/>}
        {showModalProfile && <ModalProfile handleCloseModalProfile ={handleCloseModalProfile}/>}
      </div>
      
    </>
  );
}

export default MainTab;
