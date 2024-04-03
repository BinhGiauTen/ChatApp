import React, { useEffect, useRef } from "react";
import ModalProfileDetail from "./ModalProfileDetail";
import { useSelector } from "react-redux";

function ModalProfile({handleCloseModalProfile}) {
  // const profileRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (profileRef.current && !profileRef.current.contains(event.target)) {
        
  //       handleCloseModalProfile();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [handleCloseModalProfile]);

  // ref={profileRef}

  const userState = useSelector((state) => state.user.user.user);

  return (
    <div className="modal-profile" >
      <div className="profile-name">{userState.username}</div>
      <ModalProfileDetail handleCloseModalProfile={handleCloseModalProfile}/>
      <div className="profile-item ">Cài đặt</div>
      <div className="profile-item profile-logout">Đăng xuất</div>
    </div>
  );
}

export default ModalProfile;
