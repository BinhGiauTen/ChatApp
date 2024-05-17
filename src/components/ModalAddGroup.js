import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdCameraAlt } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "../features/friend/friendSlice";
import { createGroupChat } from "../features/groupChat/groupChatSlice";
import { getAllConversations } from "../features/message/messageSlice";

function ModalAddGroup() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriendsList(userState?._id));
  }, [userState?._id]);

  const friendList = useSelector((state) => state?.friend?.getFriendsList);

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState("");
  const handleFriendSelection = (event, friendId) => {
    if (event.target.checked) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    }
  };
  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroupChat = async () =>{
    await dispatch(createGroupChat({participantsId: selectedFriends, conversationName: groupName}));
    handleClose();
    dispatch(getAllConversations());
  }

  return (
    <>
      <div className="add-icon" onClick={handleShow}>
        <AiOutlineUsergroupAdd className="add-icon-img" />
      </div>

      <Modal show={show} onHide={handleClose} className="modal-add-friend">
        <Modal.Header closeButton>
          <Modal.Title className="label-add-contact">Tạo nhóm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-create-group">
            <div className="create-group-avatar">
              <MdCameraAlt className="create-group-avatar-img" />
            </div>
            <div className="create-group-name">
              <input
                placeholder="Nhập tên nhóm"
                className="input-in-modal"
                value={groupName}
                onChange={handleGroupNameChange}
              />
            </div>
          </div>
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
            return (
              <div className="to-add-group" key={index}>
                <div className="contact-to-add-group">
                  <input
                    type="checkbox"
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
          <Button variant="primary" onClick={handleCreateGroupChat}>
            Tạo nhóm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddGroup;
