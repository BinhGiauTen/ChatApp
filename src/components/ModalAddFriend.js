import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaFlagCheckered } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { findUserByPhones, getaUser } from "../features/user/userSlice";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import {
  createFriendRequest,
  resetState,
} from "../features/friend/friendSlice";

function ModalAddFriend() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setModalType("search");
  };
  const handleShow = () => setShow(true);

  const [modalType, setModalType] = useState("search"); // State để lưu trạng thái của modal

  const dispatch = useDispatch();
  const userState = useSelector(
    (state) => state?.user?.user?.user || state?.user?.user
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSearch = () => {
    dispatch(findUserByPhones({ id: userState?._id, phones: phoneNumber }));
  };

  const findUserByPhone = useSelector((state) => state?.user?.findUserByPhone);
  const createdFriendRequest = useSelector(
    (state) => state?.friend?.createdFriendRequest
  );
  const firstUser =
    findUserByPhone && findUserByPhone.length > 0 ? findUserByPhone[0] : null;
  const avatarSrc =
    firstUser?.avatar === "https://example.com/cute-pusheen.jpg"
      ? "images/avatar-default.jpg"
      : firstUser?.avatar;

  const dateString = firstUser?.dob;
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const formattedDate = `${day} tháng ${month}, ${year}`;

  useEffect(() => {
    if (firstUser !== null) {
      setModalType("info");
    }
  }, [firstUser]);
  useEffect(() => {
    if (findUserByPhone?.length <= 0) {
      toast.error("Số điện thoại này không hợp lệ hoặc chưa được đăng ký !!!");
    }
  }, [findUserByPhone]);
  useEffect(() => {
    if (createdFriendRequest) {
      if (createdFriendRequest === "Request was already sent") {
        toast.info("Bạn đã gửi lời mời kết bạn đến người này rồi !!!");
      } else {
        toast.success("Đã gửi lời mời kết bạn thành công !!!");
      }
    }
  }, [createdFriendRequest]);

  const handleBackToDefault = () => {
    setModalType("search");
  };

  // Dùng await để chắc chắn createFriendRequest được gọi xong mới gọi resetState
  const handleCreateFriendRequest = async () => {
    await dispatch(
      createFriendRequest({ id: userState?._id, recipentId: firstUser?._id })
    );
    handleClose();
    dispatch(resetState());
  };

  const [isFriend, setIsFriend] = useState(false); // State để kiểm tra xem là bạn bè hay không

  useEffect(() => {
    if (
      firstUser &&
      firstUser?._id &&
      userState &&
      userState?.friends.includes(firstUser?._id)
    ) {
      setIsFriend(true); // Nếu là bạn bè, cập nhật state
    } else {
      setIsFriend(false);
    }
  }, [firstUser, userState]);

  const handleCall = () =>{
    console.log("Call")
  }

  useEffect(()=>{
    dispatch(getaUser(userState?._id));
  }, [])
  return (
    <>
      <div className="add-icon" onClick={handleShow}>
        <AiOutlineUserAdd className="add-icon-img" />
      </div>

      <Modal show={show} onHide={handleClose} className="modal-add-friend">
        {modalType === "search" ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="label-add-contact">Thêm bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="find-friend">
                <div className="regions">
                  <FaFlagCheckered />
                  <span>(+84)</span>
                  <IoMdArrowDropdown />
                </div>
                <div className="input-add-contact">
                  <input
                    placeholder="Số điện thoại"
                    className="input-in-modal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <span>
                <AiOutlineFieldTime className="icon-inner" />
                <span className="text-inner">Có thể bạn quen</span>
              </span>
              <div>
                <div className="another-contact-container">
                  <div className="chat-avatar">
                    <img
                      src="https://s120-ava-talk.zadn.vn/4/4/a/2/1/120/9207b2750ba3206d04791ae71ad00a1e.jpg"
                      alt=""
                      className="chat-avatar-img"
                    />
                  </div>
                  <div className="another-contact">
                    <div className="another-contact-name">Trần Văn Bình</div>
                    <div className="another-contact-description">
                      Từ gợi ý kết bạn
                    </div>
                  </div>
                  <button className="btn-add-friend-in-modal">Kết bạn</button>
                </div>
                <div className="another-contact-container">
                  <div className="chat-avatar">
                    <img
                      src="https://s120-ava-talk.zadn.vn/4/4/a/2/1/120/9207b2750ba3206d04791ae71ad00a1e.jpg"
                      alt=""
                      className="chat-avatar-img"
                    />
                  </div>
                  <div className="another-contact">
                    <div className="another-contact-name">Trần Văn Bình</div>
                    <div className="another-contact-description">
                      Từ gợi ý kết bạn
                    </div>
                  </div>
                  <button className="btn-add-friend-in-modal">Kết bạn</button>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="label-add-contact">
                <div className="d-flex gap-3">
                  <MdOutlineKeyboardArrowLeft
                    className="icon-back"
                    onClick={handleBackToDefault} // Gọi hàm handleBackToDefault khi nhấn nút back
                  />
                  <div className="label-add-contact">Thông tin tài khoản</div>
                </div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ padding: 0 }}>
              <div className="content-profile-detail">
                <img
                  src="https://res-zalo.zadn.vn/upload/media/2019/9/18/28_1568803270858_25195.jpg"
                  alt="bg-avatar"
                  className="bg-avatar"
                />
              </div>
              <div className="wrapper-find">
                <div className="profile-info-container-find">
                  <div className="profile-info-avatar">
                    <img
                      src={avatarSrc}
                      alt=""
                      className="profile-info-avatar-img"
                    />
                  </div>
                  <div className="profile-info-name">{firstUser?.username}</div>
                  <div className="profile-icon-update">
                    <LuPencilLine />
                  </div>
                </div>
                <div className="add-friend-action-button gap-3">
                  <Button
                    variant={isFriend ? "primary" : "secondary"} // Chọn variant dựa trên trạng thái bạn bè
                    onClick={isFriend ? handleCall : handleCreateFriendRequest} // Gọi hàm handleCall nếu là bạn bè, ngược lại gọi handleCreateFriendRequest
                    style={{ width: "45%" }}
                  >
                    {isFriend ? "Gọi thoại" : "Kết bạn"}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "45%" }}
                  >
                    Nhắn tin
                  </Button>
                </div>
              </div>

              <div className="profile-card-info">
                <div className="profile-card-info-heading">
                  Thông tin cá nhân
                </div>
                <div className="profile-card-info-wrapper">
                  <div className="profile-card-info-label">Giới tính</div>
                  <div className="profile-card-info-content">
                    {firstUser?.gender}
                  </div>
                </div>
                <div className="profile-card-info-wrapper">
                  <div className="profile-card-info-label">Ngày sinh</div>
                  <div className="profile-card-info-content">
                    {formattedDate}
                  </div>
                </div>
                <div className="profile-card-info-wrapper">
                  <div className="profile-card-info-label">Điện thoại</div>
                  <div className="profile-card-info-content">
                    {firstUser?.phone}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalAddFriend;
