import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, getAllMessages } from "../features/message/messageSlice";

function ModalMessageOptions({ isOpen, onClose, message, position }) {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user);
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );
  // Lấy id người nhận
  const receiverId = conversationState?.participants?.find(
    (participant) => participant?._id !== userState?._id
  )?._id;
  const handleDelete = async () => {
    await dispatch(deleteMessage({participantId: receiverId , messageId: message?._id}));
    dispatch(getAllMessages(receiverId));
    onClose();
  };

  const modalLeft = position?.x - 450;

  return (
    <div className={`modall ${isOpen ? "show" : ""}`} style={{ top: `${position?.y}px`, left: `${modalLeft}px`}}>
      <div className="modall-content" >
        <div className="modall-content-item">Chuyển tiếp tin nhắn</div>
        <div className="modall-content-item red" onClick={handleDelete}>Thu hồi tin nhắn</div>
        <div className="modall-content-item" onClick={onClose}>Đóng</div>
      </div>
    </div>
  );
}

export default ModalMessageOptions;
