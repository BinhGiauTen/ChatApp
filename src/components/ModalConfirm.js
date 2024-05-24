import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalConfirm({ show, handleClose, handleConfirm }) {
  return (
    <Modal show={show} onHide={handleClose} className="modal-logout">
      <Modal.Header closeButton>
        <Modal.Title className="label-add-contact">Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-modal-logout">
        <div className="body-modal-logout-ask">
          Bạn có chắc chắn muốn thực hiện hành động này không?
        </div>
      </Modal.Body>
      <Modal.Footer className="footer-modal-logout">
        <Button variant="secondary" onClick={handleClose}>
          Không
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirm;
