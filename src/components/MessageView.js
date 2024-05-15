import React, { useState, useEffect, useContext, useRef } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { LuSticker } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";
import { BiScreenshot } from "react-icons/bi";
import { TiBusinessCard } from "react-icons/ti";
import { CiAlarmOn } from "react-icons/ci";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { MdFormatShapes } from "react-icons/md";
import { FaExclamation } from "react-icons/fa6";
import { FaRegFaceGrin } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, sendFile, sendImage, sendMessage } from "../features/message/messageSlice";
import ModalMessageOptions from "./ModalMessageOptions";
import { SocketContext } from "../context/SocketContext";

function MessageView() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const messageState = useSelector((state) => state?.message?.getAllMessages);
  // Lấy conversation
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );
  // Lấy id người nhận
  const receiverId = conversationState?.participants?.find(
    (participant) => participant?._id !== userState?._id
  )?._id;
  console.log("receiverId", receiverId);
  console.log("MessageState", messageState);

  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    setIsSending(e.target.value.trim() !== "");
  };

  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    socket?.on("newMessage", (newMessage) => {
      if (Array.isArray(newMessage)) {
        newMessage.forEach((message) => {
          dispatch(getAllMessages(message?.senderId));
        });
      } else {
        dispatch(getAllMessages(newMessage?.senderId));
      }
    });

    // return () => {
    //   // Ngắt kết nối socket khi component unmount
    //   socket?.disconnect();
    // };
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      await dispatch(
        sendMessage({
          receiverId: receiverId,
          message: inputValue,
        })
      );
      setInputValue("");
      setIsSending(false);
      dispatch(getAllMessages(receiverId));
    }
  };

  // Send image
  const imageInputRef = useRef(null);
  const handleChooseImage = (event) => {
    imageInputRef.current.click();
  };
  const handleSendImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await dispatch(sendImage({
        receiverId: receiverId, file: file
      }))
      dispatch(getAllMessages(receiverId));
    }
  };

  // Send file
  const fileInputRef = useRef(null);
  const handleChooseFile = (event) => {
    fileInputRef.current.click();
  };
  const handleSendFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await dispatch(sendFile({
        receiverId: receiverId, file: file
      }))
      dispatch(getAllMessages(receiverId));
    }
  };



// Delete message
  const [currentClickMessage, setCurrentClickMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (event, item) => {
    event.preventDefault(); // Ngăn không cho menu chuột phải mặc định hiển thị
    const position = { x: event.clientX, y: event.clientY };
    console.log("Right click message", item);
    console.log("Position:", position);

    // Hiển thị modal với các tùy chọn và truyền item hiện tại vào để biết được đối tượng cần xử lý
    setShowModal(true);
    setCurrentClickMessage(item);
    setModalPosition(position); // Lưu vị trí hiển thị modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentClickMessage(null);
  };

  return (
    <>
    <header className="header">
        <div className="d-flex align-items-center justify-content-center">
          <div className="avatar-contact">
            <img
              src={
                conversationState?.conversationImage
                  ? conversationState?.conversationImage
                  : conversationState?.participants?.find(
                      (participant) => participant?._id !== userState?._id
                    )?.avatar === "https://example.com/cute-pusheen.jpg"
                  ? "images/avatar-default.jpg"
                  : conversationState?.participants?.find(
                      (participant) => participant?._id !== userState?._id
                    )?.avatar
              }
              alt=""
              className="avatar-img"
            />
          </div>
          <div>
            <div className="name-contact-header">
              {conversationState?.name
                ? conversationState?.name
                : conversationState?.participants?.find(
                    (participant) => participant?._id !== userState?._id
                  )?.username}
            </div>
            <div className="access-hisory">
              <span className="access-history-text">
                Truy cập ... giờ trước
              </span>
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
    <div className="container-message">
      <div className="message-view">
        {messageState?.map((item, index) => {
          return (
            <div key={index} onContextMenu={(e) => handleRightClick(e, item)}>
              <div
                className={`chat-item ${
                  item?.senderId === userState?._id ? "chat-item-me" : ""
                }`}
              >
                {item?.senderId !== userState._id && (
                  <div className="chat-avatar">
                    <img
                      src={
                        conversationState?.participants?.find(
                          (participant) => participant?._id !== userState?._id
                        )?.avatar === "https://example.com/cute-pusheen.jpg"
                          ? "images/avatar-default.jpg"
                          : conversationState?.participants?.find(
                              (participant) =>
                                participant?._id !== userState?._id
                            )?.avatar
                      }
                      alt=""
                      className="chat-avatar-img"
                    />
                  </div>
                )}
                <div className="chat-content">
                  <div className="card">
                    {item?.messageType === "image" && (
                      <img
                        src={item?.messageUrl}
                        alt="Image"
                        className="chat-image"
                      />
                    )}
                    {item?.messageType === "file" && (
                      <div className="file-info">
                        <TiAttachment className="file-icon" />
                        <a
                          href={item?.messageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.message}
                        </a>
                      </div>
                    )}
                    {item?.messageType === "text" && (
                      <div className="chat-message">{item?.message}</div>
                    )}
                    <div className="time-chat-message">{item?.createdAt}</div>
                    <div className="message-reaction">
                      <AiOutlineLike />
                    </div>
                  </div>
                </div>
              </div>
              <ModalMessageOptions
                isOpen={showModal}
                onClose={handleCloseModal}
                message={currentClickMessage}
                position={modalPosition}
              />
            </div>
          );
        })}
      </div>
      <div className="toolbar">
        <div className="toolbar-icon icon">
          <LuSticker className="header-icon-image" />
        </div>
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleSendImage}
        />
        <div onClick={handleChooseImage} className="toolbar-icon icon">
          <CiImageOn className="header-icon-image" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleSendFile}
        />
        <div onClick={handleChooseFile} className="toolbar-icon icon">
          <TiAttachment className="header-icon-image" />
        </div>
        <div className="toolbar-icon icon">
          <BiScreenshot className="header-icon-image" />
        </div>
        <div className="toolbar-icon icon">
          <TiBusinessCard className="header-icon-image" />
        </div>
        <div className="toolbar-icon icon">
          <CiAlarmOn className="header-icon-image" />
        </div>
        <div className="toolbar-icon icon">
          <MdAssignmentTurnedIn className="header-icon-image" />
        </div>
        <div className="toolbar-icon icon">
          <MdFormatShapes className="header-icon-image" />
        </div>
        <div className="toolbar-icon icon">
          <FaExclamation className="header-icon-image" />
        </div>
      </div>
      <div className="chat-input-container d-flex align-items-center ">
        <input
          placeholder={`Nhập @, tin nhắn gửi đến ${
            conversationState?.participants?.find(
              (participant) => participant?._id !== userState?._id
            )?.username
          }`}
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={handleChangeInput}
        />
        <div className="d-flex align-items-center justify-content-center">
          <div className="chat-input-icon icon">
            <FaRegFaceGrin className="header-icon-image" />
          </div>
          <div className="chat-input-icon icon" onClick={handleSendMessage}>
            {isSending ? (
              <IoSend className="header-icon-image" />
            ) : (
              <SlLike className="header-icon-image" />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MessageView;
