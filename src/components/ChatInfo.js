import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPencilLine } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { RxDrawingPin } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { getParticipantsFromGroup } from "../features/groupChat/groupChatSlice";
import ModalAddUserToGroup from "./ModalAddUserToGroup";

function ChatInfo() {
  const dispatch = useDispatch();
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );

  const [stateOption, setStateOption] = useState("default");
  const handleOpenChatInfo = () => {
    setStateOption("info");
  };
  const handleUndoChatInfo = () => {
    setStateOption("default");
  };

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    dispatch(getParticipantsFromGroup(conversationState?._id));
  }, [conversationState?._id]);

  const participants = useSelector((state) => state?.groupChat?.participants);

  return (
    <div className="chat-info">
      {stateOption === "default" && (
        <div>
          <div className="chat-info-header">Thông tin nhóm</div>
          <div className="header-info">
            <div className="header-info-avatar">
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
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="header-info-groupname">
                {conversationState?.name}
              </div>
              <div className="info-icon-update">
                <LuPencilLine />
              </div>
            </div>
            <div className="header-info-tool">
              <div className="header-info-tool-button">
                <div className="header-info-icon">
                  <div className="header-info-tool-icon">
                    <GoBell className="header-info-tool-icon-image" />
                  </div>
                </div>
                <div className="header-info-tool-label">Tắt thông báo</div>
              </div>
              <div className="header-info-tool-button">
                <div className="header-info-icon">
                  <div className="header-info-tool-icon">
                    <RxDrawingPin className="header-info-tool-icon-image" />
                  </div>
                </div>
                <div className="header-info-tool-label">Ghim hội thoại</div>
              </div>
              <div className="header-info-tool-button">
                <div className="header-info-icon">
                  <div className="header-info-tool-icon">
                    <AiOutlineUsergroupAdd className="header-info-tool-icon-image" onClick={handleShow}/>
                  </div>
                </div>
                <div className="header-info-tool-label">Thêm thành viên</div>
              </div>
              <div className="header-info-tool-button">
                <div className="header-info-icon">
                  <div className="header-info-tool-icon">
                    <IoSettingsOutline className="header-info-tool-icon-image" />
                  </div>
                </div>
                <div className="header-info-tool-label">Quản lý nhóm</div>
              </div>
            </div>
          </div>
          <div className="group-members">
            <div className="group-members-label">Thành viên nhóm</div>
            <div className="group-members-content">
              <MdOutlineGroup className="group-members-icon-image" />
              <div onClick={handleOpenChatInfo}>
                {participants?.length} thành viên
              </div>
            </div>
          </div>
        </div>
      )}
      {stateOption === "info" && (
        <div>
          <div className="chat-info-header">
            <MdOutlineKeyboardArrowLeft
              className="members-icon-back"
              onClick={handleUndoChatInfo}
            />
            <div>Thành viên</div>
          </div>
          <div className="add-members">
            <div className="add-members-button" onClick={handleShow}>
              <AiOutlineUsergroupAdd />
              Thêm thành viên
            </div>
          </div>
          <div className="members-title">
            Danh sách thành viên ({participants?.length})
            <IoIosMore className="icon-more-image" />
          </div>
          {participants?.map((item, index) => {
            return (
              <div className="members-info" key={index}>
                <div className="chat-avatar avatar-to-add-group">
                  <img
                    src={
                      item?.avatar === "https://example.com/cute-pusheen.jpg"
                        ? "images/avatar-default.jpg"
                        : item?.avatar
                    }
                    alt=""
                    className="chat-avatar-img"
                  />
                </div>
                <div className="name-contact-to-add-group">{item?.username}</div>
              </div>
            );
          })}
        </div>
      )}
      <ModalAddUserToGroup show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default ChatInfo;
