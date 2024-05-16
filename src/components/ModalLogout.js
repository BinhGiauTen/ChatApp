import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ModalLogout({ handleCloseSettingModal, handleCloseModalProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state?.user?.user?.user || state?.user?.user);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (handleCloseSettingModal) handleCloseSettingModal();
    if (handleCloseModalProfile) handleCloseModalProfile();
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleLogout = () => {
    dispatch(logout(userState?._id));
    setShow(false);
  };
  const { message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message === "Logout successful") {
      localStorage.removeItem("User");
      localStorage.removeItem("token");
      navigate("/login");
      toast.success("Đăng xuất thành công !!!");
    }else if(message === "Logout fail"){
      toast.error("Đăng xuất thất bại !!!");
    }
  }, [message]);

  return (
    <>
      <div className=" setting-item label-logout" onClick={handleShow}>
        Đăng xuất
      </div>

      <Modal show={show} onHide={handleClose} className="modal-logout">
        <Modal.Header closeButton>
          <Modal.Title className="label-add-contact">Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-modal-logout">
          <div className="body-modal-logout-ask">
            Bạn có muốn đăng xuất khỏi zalo
          </div>
          <div className="body-modal-logout-option">
            <input type="checkbox" />
            <div>Xóa lịch sử trò chuyện khi đăng xuất</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer-modal-logout">
          <Button variant="secondary" onClick={handleClose}>
            Không
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLogout;
