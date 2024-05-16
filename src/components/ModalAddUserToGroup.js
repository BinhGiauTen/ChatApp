import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "../features/friend/friendSlice";
import { addToGroupChat } from "../features/groupChat/groupChatSlice";

function ModalAddUserToGroup({show, handleClose}) {

  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriendsList(userState?._id));
  }, [userState?._id]);

  const friendList = useSelector((state) => state?.friend?.getFriendsList);
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );
  console.log("conversationState in Modal add user", conversationState);
  const [selectedFriends, setSelectedFriends] = useState([]);
  useEffect(() => {
    // Update selectedFriends based on conversation participants when conversationState updates
    const participantIds = conversationState?.participants?.map((participant) => participant._id) || [];
    setSelectedFriends(participantIds);
  }, [conversationState]);

  const handleFriendSelection = (event, friendId) => {
    if (event.target.checked) {
      setSelectedFriends((prev) => [...prev, friendId]);
    } else {
      setSelectedFriends((prev) => prev.filter((id) => id !== friendId));
    }
  };

  console.log("SelectedFriend", selectedFriends);

  const handleAddUserToGroup = () =>{
    dispatch(addToGroupChat({conversationId: conversationState?._id, participantId: selectedFriends}))
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-add-friend">
        <Modal.Header closeButton>
          <Modal.Title className="label-add-contact">
            Thêm thành viên
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-contact-container">
            <div className="search-contact-icon">
              <IoSearchOutline className="search-contact-icon-img" />
            </div>
            <input
              placeholder="Nhập tên, số điện thoại hoặc danh sách số điện thoại"
              className="search-contact-input"
            />
          </div>
          <div className="group-creator">
            <div className="cg-tag selected">Tất cả</div>
            <div className="cg-tag">Khách hàng</div>
            <div className="cg-tag">Gia đình</div>
            <div className="cg-tag">Công việc</div>
            <div className="cg-tag">Bạn bè</div>
          </div>
          <div className="to-add-group-label">Danh sách bạn bè</div>
          {friendList?.map((item, index) => {
            const isChecked = selectedFriends.includes(item._id);
            return (
              <div className="to-add-group" key={index}>
                <div className="contact-to-add-group">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleFriendSelection(e, item?._id)}
                  />
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
                    {item?.username}
                  </div>
                </div>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddUserToGroup}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddUserToGroup;
