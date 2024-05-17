import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPencilLine } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { RxDrawingPin } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  addAminPermission,
  closeGroupChat,
  getParticipantsFromGroup,
  removeFromGroupChat,
} from "../features/groupChat/groupChatSlice";
import ModalAddUserToGroup from "./ModalAddUserToGroup";
import {
  getAConversation,
  getAllConversations,
} from "../features/message/messageSlice";
import { SocketContext } from "../context/SocketContext";

function ChatInfo() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );
  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
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

  const isAdmin = conversationState?.admin?.includes(userState?._id);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMakeAdmin = async (userId) => {
    await dispatch(
      addAminPermission({
        conversationId: conversationState?._id,
        participantId: userId,
      })
    );
    dispatch(getAConversation({ conversationId: conversationState?._id }));
  };

  const handleRemoveUser = async (userId) => {
    await dispatch(
      removeFromGroupChat({
        conversationId: conversationState?._id,
        participantId: userId,
      })
    );
    await dispatch(getParticipantsFromGroup(conversationState?._id));
    dispatch(getAConversation({ conversationId: conversationState?._id }));
  };

  const handleCloseGroup = async () => {
    await dispatch(
      closeGroupChat({
        conversationId: conversationState?._id,
      })
    );
    dispatch(getAllConversations());
  };

  const handleOutGroup = async () => {
    // await dispatch(
    //   removeFromGroupChat({
    //     conversationId: conversationState?._id,
    //     participantId: userState?._id,
    //   })
    // );
    // dispatch(getAllConversations());
  };

  console.log("Conversation State in ChatInfo:", conversationState);
  useEffect(() => {
    socket?.on("updateGroupChat", (conversation) => {
      console.log("updateGroupChat:", conversation);
      if (conversation._id === conversationState._id) {
        dispatch(getParticipantsFromGroup(conversation._id));
        dispatch(getAConversation({ conversationId: conversationState._id }));
      }
    });

    socket?.on("newConversation", (conversation) => {
      console.log("newConversation:", conversation);
      if (conversation._id === conversationState._id) {
        dispatch(getParticipantsFromGroup(conversationState._id));
        dispatch(getAConversation({ conversationId: conversationState._id }));
      }
    });
  }, [socket]);

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
                    <AiOutlineUsergroupAdd
                      className="header-info-tool-icon-image"
                      onClick={handleShow}
                    />
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

          <div className="group-members">
            {isAdmin && (
              <div className="group-members-content">
                <IoIosLogOut className="group-members-icon-image red" />
                <div onClick={handleCloseGroup} className="red">
                  Giải tán nhóm
                </div>
              </div>
            )}
            <div className="group-members-content">
              <IoIosLogOut className="group-members-icon-image red" />
              <div onClick={handleOutGroup} className="red">
                Rời nhóm
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
                <div className="name-contact-to-add-group">
                  {item?._id === userState?._id ? "Bạn" : item?.username}
                  {conversationState?.admin?.includes(item?._id) && (
                    <div className="label-main">Trưởng nhóm</div>
                  )}
                </div>
                {isAdmin && (
                  <div className="icon icon-more icon-more-chat-info">
                    <DropdownButton
                      id={`dropdown-${index}`}
                      title={<IoIosMore className="icon-more-image" />}
                      onToggle={() => handleDropdownToggle(index)}
                      show={activeDropdown === index}
                    >
                      <Dropdown.Item onClick={() => handleMakeAdmin(item._id)}>
                        Thêm phó nhóm
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRemoveUser(item._id)}>
                        Xóa khỏi nhóm
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                )}
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
