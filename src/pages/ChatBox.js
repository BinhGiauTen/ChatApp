
import React, { useState } from "react";
import Header from "../components/Header";
import MessageView from "../components/MessageView";
import FriendList from "../components/FriendList";
import HomePageSlider from "../components/HomePageSlider";
import MessageViewGroup from "../components/MessageViewGroup";
import HeaderGroup from "../components/HeaderGroup";

function ChatBox() {
  const [showMessageView, setShowMessageView] = useState(false);
  const [showMessageViewGroup, setShowMessageViewGroup] = useState(false);

  const showMessageViewHandler = () => {
    setShowMessageView(true);
    setShowMessageViewGroup(false);
  };
  const showMessageViewGroupHandler = () => {
    setShowMessageViewGroup(true);
    setShowMessageView(false);
  };
  return (
    <div className="d-flex w-100">
      <FriendList showMessageViewHandler={showMessageViewHandler} showMessageViewGroupHandler={showMessageViewGroupHandler}/>
      <div className="chat-on-board w-100">
      {showMessageView ? (
          <div>
            <Header />
            <MessageView />
          </div>
        ) : showMessageViewGroup ? (
          <div>
            <HeaderGroup />
            <MessageViewGroup />
          </div>
        ) : (
          <div>
            <div className="content-slider">
              <div>
                Chào mừng đến với <span className="zalo-pc-text">Zalo PC</span>
              </div>
              <div>
                Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
                thân, bạn bè được tối ưu hóa cho máy tính của bạn
              </div>
            </div>
            <HomePageSlider className="slider-wrapper" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
