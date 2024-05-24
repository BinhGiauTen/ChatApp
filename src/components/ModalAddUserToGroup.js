import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "../features/friend/friendSlice";
import { addToGroupChat, getParticipantsFromGroup } from "../features/groupChat/groupChatSlice";

function ModalAddUserToGroup({ show, handleClose }) {
  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState?._id) {
      dispatch(getFriendsList(userState._id));
    }
  }, [userState?._id, dispatch]);

  const friendList = useSelector((state) => state?.friend?.getFriendsList);
  const conversationState = useSelector(
    (state) => state?.message?.getAConversation
  );

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [newSelectedFriends, setNewSelectedFriends] = useState([]);

  useEffect(() => {
    const participantIds =
      conversationState?.participants?.map((participant) => participant._id) ||
      [];
    setSelectedFriends(participantIds);
  }, [conversationState]);

  const handleFriendSelection = (event, friendId) => {
    if (event.target.checked) {
      setNewSelectedFriends((prev) => [...prev, friendId]);
    } else {
      setNewSelectedFriends((prev) => prev.filter((id) => id !== friendId));
    }
  };

  const handleAddUserToGroup = async () => {
    await dispatch(
      addToGroupChat({
        conversationId: conversationState?._id,
        participantsId: newSelectedFriends,
      })
    );
    dispatch(getParticipantsFromGroup(conversationState?._id));
    handleClose();
  };

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
            const isChecked = selectedFriends.includes(item._id) || newSelectedFriends.includes(item._id);
            const isDisabled = selectedFriends.includes(item._id);

            return (
              <div className="to-add-group" key={index}>
                <div className="contact-to-add-group">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleFriendSelection(e, item?._id)}
                    disabled={isDisabled}
                    className={isDisabled ? "disabled-checkbox" : ""}
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
          <Button variant="primary" onClick={handleAddUserToGroup} disabled={newSelectedFriends.length === 0}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddUserToGroup;
