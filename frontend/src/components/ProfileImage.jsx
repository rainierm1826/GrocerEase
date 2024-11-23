import React from "react";
import { useSelector } from "react-redux";

const ProfileImage = ({ h, w, fun }) => {
  const userInfo = useSelector((state) => state.user.user);

  return (
    <div
      className={`h-${h} w-${w} rounded-full border-2 border-primaryBlue overflow-hidden`}
    >
      <img
        src={userInfo.user.image}
        alt="User Avatar"
        className="object-cover h-full w-full"
        onClick={fun}
      />
    </div>
  );
};

export default ProfileImage;
