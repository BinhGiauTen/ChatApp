import React, {useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAConversation,
  getAllMessages,
} from "../features/message/messageSlice";
import { getGroupChatMessages } from "../features/groupChat/groupChatSlice";
import TimeFormatter from "./TimeFormatter";
import { SocketContext } from "../context/SocketContext";

function MessageItem({
  showMessageViewHandler,
  showMessageViewGroupHandler,
  data,
}) {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const handleClick = (item) => {
    if (item?.name) {
      showMessageViewGroupHandler(item);
      dispatch(getGroupChatMessages(item?._id));
      dispatch(getAConversation({ conversationId: item?._id }));
    } else {
      showMessageViewHandler(item);
      // Lấy tin nhắn của người nhận chat có _id khác với userState._id
      const receiverId = item?.participants?.find(
        (participant) => participant?._id !== userState?._id
      )?._id;
      dispatch(getAllMessages(receiverId));
      dispatch(getAConversation({ conversationId: item?._id }));
    }
  };

  useEffect(() => {
    socket?.on("newConversation", (newConversation) => {
      console.log("Newmessage:", newConversation);
      // dispatch(getGroupChatMessages(newMessage?.conversationId));
    });
  }, []);

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
                  {item?.lastMessage?.message ? item?.lastMessage?.message : ""}
                </div>
              </div>
            </div>
            <div className="time-contact">
              {item?.lastMessage?.createdAt ? (
                <TimeFormatter timestamp={item?.lastMessage?.createdAt} />
              ) : (
                ""
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="ps-3">Chưa có tin nhắn</div>
      )}
    </>
  );
}

export default MessageItem;
