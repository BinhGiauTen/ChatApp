import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getGroupChatMessages, revokeGroupChatMessage } from "../features/groupChat/groupChatSlice";

function ModalMessageGroupOptions({ isOpen, onClose, message, position }) {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user);
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );
  const handleRevokeMessageGroup = async () => {
    console.log("Delete message in group");
    await dispatch(revokeGroupChatMessage({conversationId: conversationState?._id , messageId: message?._id}));
    dispatch(getGroupChatMessages(conversationState?._id));
    onClose();
  };

  const modalLeft = position?.x - 450;

  return (
    <div className={`modall ${isOpen ? "show" : ""}`} style={{ top: `${position?.y}px`, left: `${modalLeft}px`}}>
      <div className="modall-content" >
        <div className="modall-content-item">Chuyển tiếp tin nhắn</div>
        <div className="modall-content-item red" onClick={handleRevokeMessageGroup}>Thu hồi tin nhắn</div>
        <div className="modall-content-item" onClick={onClose}>Đóng</div>
      </div>
    </div>
  );
}

export default ModalMessageGroupOptions;
