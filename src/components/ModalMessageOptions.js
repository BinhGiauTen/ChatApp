import React from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../features/message/messageSlice";

function ModalMessageOptions({ isOpen, onClose, message, position }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMessage(message.id));
    onClose();
  };

  return (
    <div className={`modall ${isOpen ? "show" : ""}`} style={{ top: `${position?.y}px`, left: `${position?.x}px`}}>
      <div className="modall-content" >
        <button onClick={handleDelete}>Xóa tin nhắn</button>
        <button>Thu hồi tin nhắn</button>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

export default ModalMessageOptions;
