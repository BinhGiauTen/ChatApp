import React, { useState, useEffect, useContext } from "react";
import ContactSearch from "../components/ContactSearch";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { BsSortAlphaDown } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuMailOpen } from "react-icons/lu";
import { PiUserListBold } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";

import {
  cancelFriendRequest,
  confirmFriendAccept,
  getAllFriendRequestSented,
  getAllFriendsRequest,
  getFriendsList,
  resetState,
} from "../features/friend/friendSlice";
import { getaUser } from "../features/user/userSlice";

function Contact() {
  const { socket } = useContext(SocketContext);
  const [selectedList, setSelectedList] = useState("friends");
  const [selectedItem, setSelectedItem] = useState("null");
  const handleListClick = (name) => {
    setSelectedList(name);
    setSelectedItem(name);
  };

  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState?._id) {
      dispatch(getAllFriendsRequest(userState?._id));
      dispatch(getFriendsList(userState?._id));
      dispatch(getAllFriendRequestSented(userState?._id));
    }
  }, [userState]);

  const friendRequests = useSelector(
    (state) => state?.friend?.getAllFriendsRequest
  );

  const handleAcceptFriendRequest = async (requesterId) => {
    await dispatch(
      confirmFriendAccept({ id: userState?._id, requesterId: requesterId })
    );
    dispatch(getAllFriendsRequest(userState._id));
    dispatch(getaUser(userState?._id));
    dispatch(resetState());
  };

  const friendsList = useSelector((state) => state?.friend?.getFriendsList);

  const listSented = useSelector(
    (state) => state?.friend?.getAllFriendRequestSented
  );

  const handleCancelFriendRequest = async (recipentId) => {
    await dispatch(
      cancelFriendRequest({ id: userState?._id, recipentId: recipentId })
    );
    dispatch(getAllFriendRequestSented(userState?._id));
    dispatch(getaUser(userState?._id));
    dispatch(resetState());
  };

  useEffect(() => {
    socket?.on("acceptedFriendRequest", (requester) => {
      dispatch(getFriendsList(userState?._id));
    });
    // socket?.on("newFriendRequest", (requester) => {
    //   console.log("New friend Request", requester)
    //   dispatch(getAllFriendsRequest(userState._id));
    // });

    // return () => socket.off("delMessage");
  }, [socket]);

  const conversationState = useSelector(
    (state) => state?.message?.getAllConversations
  );

  // Filter out group conversations with status = 1
  const filteredGroupConversations =
    conversationState?.filter(
      (conversation) =>
        conversation.conversationType === "Group" && conversation.status === 1
    ) || [];

  return (
    <div className="contact">
      <div className="menu-contact">
        <ContactSearch />
        <div className="contact-list">
          <div
            className={`contact-item ${
              selectedItem === "friends" ? "select" : ""
            }`}
            onClick={() => handleListClick("friends")}
          >
            <PiUserListBold className="contact-item-icon" />
            <span>Danh sách bạn bè</span>
          </div>
          <div
            className={`contact-item ${
              selectedItem === "groups" ? "select" : ""
            }`}
            onClick={() => handleListClick("groups")}
          >
            <RiGroupLine className="contact-item-icon" />
            <span>Danh sách nhóm</span>
          </div>
          <div
            className={`contact-item ${
              selectedItem === "invites" ? "select" : ""
            }`}
            onClick={() => handleListClick("invites")}
          >
            <LuMailOpen className="contact-item-icon" />
            <span>Lời mời kết bạn</span>
          </div>
        </div>
      </div>
      <div className="main-contact">
        {selectedList === "friends" && (
          <div>
            <div className="main-contact-header">
              <PiUserListBold className="contact-item-icon" />
              <span>Danh sách bạn bè</span>
            </div>
            <div className="card-list-wrapper">
              <div className="title">
                Bạn bè ({friendsList ? friendsList.length : 0})
              </div>
              <div className="card-contact">
                <div className="contact-filter">
                  <div className="group-search">
                    <IoSearchOutline className="contact-search-icon" />
                    <input
                      id="contact-search-input"
                      type="text"
                      placeholder="Tìm bạn"
                    />
                  </div>
                  <div className="contact-filter-select">
                    <BsSortAlphaDown />
                    <div className="name-filter">Tên (A-Z)</div>
                    <IoIosArrowDown />
                  </div>
                  <div className="contact-filter-select">
                    <FiFilter />
                    <div className="name-filter">Tất cả</div>
                    <IoIosArrowDown />
                  </div>
                </div>
                <span className="label">Bạn mới</span>
                {friendsList?.map((friend, index) => (
                  <div className="friend-item" key={index}>
                    <div className="avatar-friend">
                      <img
                        src={
                          friend?.avatar ===
                          "https://example.com/cute-pusheen.jpg"
                            ? "images/avatar-default.jpg"
                            : friend?.avatar
                        }
                        alt=""
                        className="avatar-img"
                      />
                    </div>
                    <div className="name">{friend.username}</div>
                    <div className="icon icon-more">
                      <IoIosMore className="icon-more-img" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedList === "groups" && (
          <div>
            <div className="main-contact-header">
              <RiGroupLine className="contact-item-icon" />
              <span>Danh sách nhóm</span>
            </div>
            <div className="card-list-wrapper">
              <div className="title">
                Nhóm (
                {filteredGroupConversations
                  ? filteredGroupConversations?.length
                  : 0}
                )
              </div>
              <div className="card-contact">
                <div className="contact-filter">
                  <div className="group-search">
                    <IoSearchOutline className="contact-search-icon" />
                    <input
                      id="contact-search-input"
                      type="text"
                      placeholder="Tìm kiếm ..."
                    />
                  </div>
                  <div className="contact-filter-select">
                    <BsSortAlphaDown />
                    <div className="name-filter">Hoạt động (mới - cũ)</div>
                    <IoIosArrowDown />
                  </div>
                  <div className="contact-filter-select">
                    <FiFilter />
                    <div className="name-filter">Tất cả</div>
                    <IoIosArrowDown />
                  </div>
                </div>
                {filteredGroupConversations?.map((item, index) => (
                  <div className="group-item" key={index}>
                    <div className="chat-avatar avatar-to-add-group">
                      <img
                        src={item?.conversationImage}
                        alt=""
                        className="chat-avatar-img"
                      />
                    </div>
                    <div className="namegroup-quantity">
                      <div className="namegroup">{item?.name}</div>
                      <div className="quantity">
                        {item?.participants?.length} thành viên
                      </div>
                    </div>
                    <div className="icon icon-more">
                      <IoIosMore className="icon-more-img" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedList === "invites" && (
          <div>
            <div className="main-contact-header">
              <LuMailOpen className="contact-item-icon" />
              <span>Lời mời kết bạn</span>
            </div>
            <div className="card-list-wrapper">
              <div className="title">
                Lời mời đã nhận (
                {friendRequests?.length ? friendRequests?.length : 0})
              </div>
              {friendRequests?.map((request, index) => (
                <div key={index} className="card-wrapper">
                  <div className="card-user">
                    <div className="card-avatar-container">
                      <img
                        src={
                          request?.req?.avatar ===
                          "https://example.com/cute-pusheen.jpg"
                            ? "images/avatar-default.jpg"
                            : request?.req?.avatar
                        }
                        alt=""
                        className="card-avatar-img"
                      />
                    </div>
                    <div className="card-name">
                      <div className="name">{request?.req?.username}</div>
                      <div className="time">
                        {new Date(request?.createdAt).toLocaleString()} - Từ số
                        điện thoại
                      </div>
                    </div>
                    <div className="go-to-chat">
                      <BsChatText className="icon-go-to-chat" />
                    </div>
                  </div>
                  <div className="card-message">
                    Xin chào mình là {request?.req?.username}. Mình tìm thấy bạn
                    bằng số điện thoại. Kết bạn với mình nhé
                  </div>
                  <div className="card-cta">
                    <button className="btn btn-secondary">Từ chối</button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleAcceptFriendRequest(request?.req?._id)
                      }
                    >
                      Đồng ý
                    </button>
                  </div>
                </div>
              ))}
              <div className="title">
                Đã gửi lời mời ({listSented?.length ? listSented?.length : 0})
              </div>
              {listSented?.map((send, index) => (
                <div key={index} className="card-wrapper">
                  <div className="card-user">
                    <div className="card-avatar-container">
                      <img
                        src={
                          send?.recei?.avatar ===
                          "https://example.com/cute-pusheen.jpg"
                            ? "images/avatar-default.jpg"
                            : send?.recei?.avatar
                        }
                        alt=""
                        className="card-avatar-img"
                      />
                    </div>
                    <div className="card-name">
                      <div className="name">{send?.recei?.username}</div>
                      <div className="time">Bạn đã gửi lời mời</div>
                    </div>
                    <div className="go-to-chat">
                      <BsChatText className="icon-go-to-chat" />
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-reject"
                    onClick={() => handleCancelFriendRequest(send?.recei?._id)}
                  >
                    Thu hồi lời mời
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
