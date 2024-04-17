import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAConversation, getAllMessages } from "../features/message/messageSlice";

function MessageItem({ showMessageViewHandler, data }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user)
  const handleClick = (item) => {
    showMessageViewHandler(item);
    console.log("Item:", item);
    // Lấy tin nhắn của người nhận chat có _id khác với userState._id
  const receiverId = item?.participants?.find(participant => participant?._id !== userState?._id)?._id;
  dispatch(getAllMessages(receiverId));
  dispatch(getAConversation({id: userState?._id, conversationId: item?._id}));
  }

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div key={index} className="message-item" onClick={() => handleClick(item)}>
            <div className="d-flex align-items-center justify-content-center">
              <div className="avatar-contact">
                <img
                  src={
                    item?.participants[item.participants.length - 1].avatar ===
                    "https://example.com/cute-pusheen.jpg"
                      ? "images/avatar-default.jpg"
                      : item?.participants[item.participants.length - 1].avatar
                  }
                  alt=""
                  className="avatar-img"
                />
              </div>
              <div>
                <div className="name-contact">{item?.name}</div>
                <div className="content-contact">
                  {item?.messages[item.messages.length - 1].message}
                </div>
              </div>
            </div>
            <div className="time-contact">
              {new Date(
                item?.messages[item.messages.length - 1].createdAt
              ).toLocaleString()}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MessageItem;
