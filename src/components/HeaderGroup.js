import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { useSelector } from "react-redux";
import ModalAddUserToGroup from "./ModalAddUserToGroup";
function HeaderGroup() {
  // Lấy conversation
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );
  return (
    <>
      <header className="header">
        <div className="d-flex align-items-center justify-content-center">
          <div className="avatar-contact">
            <img
              src={
                conversationState?.conversationImage
                  ? conversationState?.conversationImage
                  : ""
              }
              alt=""
              className="avatar-img"
            />
          </div>
          <div>
            <div className="name-contact-header">
              {conversationState?.name
                ? conversationState?.name
                : ""}
            </div>
            
          </div>
        </div>
        <div className="d-flex">
          <ModalAddUserToGroup/>
          <div className="header-icon icon">
            <IoSearchOutline className="header-icon-image" />
          </div>
          <div className="header-icon icon">
            <RiLiveLine className="header-icon-image" />
          </div>
          <div className="header-icon icon">
            <BsLayoutSidebarReverse className="header-icon-image" />
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderGroup;
