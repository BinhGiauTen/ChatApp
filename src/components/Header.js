import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { useSelector } from "react-redux";
function Header() {
  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user)
  // Lấy conversation
  const conversationState = useSelector((state) => state?.message?.getAConversation);
  return (
    <>
      <header className="header">
        <div className="d-flex align-items-center justify-content-center">
          <div className="avatar-contact">
            <img
              src={
                conversationState?.participants?.find(participant => participant?._id !== userState?._id)?.avatar ===
                "https://example.com/cute-pusheen.jpg"
                  ? "images/avatar-default.jpg"
                  : conversationState?.participants?.find(participant => participant?._id !== userState?._id)?.avatar
              }
              alt=""
              className="avatar-img"
            />
          </div>
          <div>
            <div className="name-contact-header">{conversationState?.participants?.find(participant => participant?._id !== userState?._id)?.username}</div>
            <div className="access-hisory">
              <span className="access-history-text">Truy cập ... giờ trước</span>
              <div className="border"></div>
              <div>
                <CiShoppingTag />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="header-icon icon">
            <AiOutlineUsergroupAdd className="header-icon-image" />
          </div>
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

export default Header;
