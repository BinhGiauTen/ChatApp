import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAConversation,
  getAllMessages,
} from "../features/message/messageSlice";
import { getGroupChatMessages } from "../features/groupChat/groupChatSlice";

function MessageItem({
  showMessageViewHandler,
  showMessageViewGroupHandler,
  data,
}) {
  const dispatch = useDispatch();
  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const handleClick = (item) => {
    if (item?.name) {
      showMessageViewGroupHandler(item);
      dispatch(getGroupChatMessages(item?._id));
      dispatch(
        getAConversation({conversationId: item?._id })
      );
    } else {
      showMessageViewHandler(item);
      // Lấy tin nhắn của người nhận chat có _id khác với userState._id
      const receiverId = item?.participants?.find(
        (participant) => participant?._id !== userState?._id
      )?._id;
      dispatch(getAllMessages(receiverId));
      dispatch(
        getAConversation({ conversationId: item?._id })
      );
    }
  };

  return (
    <>
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="message-item"
            onClick={() => handleClick(item)}
          >
            <div className="d-flex align-items-center justify-content-center">
              <div className="avatar-contact">
                <img
                  src={
                    item?.conversationImage
                      ? item?.conversationImage
                      : item?.participants?.length &&
                        item?.participants[item?.participants?.length - 1]
                          ?.avatar === "https://example.com/cute-pusheen.jpg"
                      ? "images/avatar-default.jpg"
                      : item?.participants[item?.participants?.length - 1]
                          ?.avatar || "images/avatar-default.jpg"
                  }
                  alt=""
                  className="avatar-img"
                />
              </div>
              <div>
                <div className="name-contact">
                  {item?.name
                    ? item?.name
                    : item?.participants?.find(
                        (participant) => participant?._id !== userState?._id
                      )?.username}
                </div>
                <div className="content-contact">
                  {item?.messages?.length > 0
                    ? item?.messages[item?.messages?.length - 1]?.message
                    : ""}
                </div>
              </div>
            </div>
            <div className="time-contact">
              {item?.createdAt
                ? new Date(item?.createdAt).toLocaleString()
                : item?.messages?.length > 0
                ? new Date(
                    item?.messages[item?.messages?.length - 1]?.createdAt
                  ).toLocaleString()
                : ""}
            </div>
          </div>
        ))
      ) : (
        <div>No messages to display</div>
      )}
    </>
  );
}

export default MessageItem;
