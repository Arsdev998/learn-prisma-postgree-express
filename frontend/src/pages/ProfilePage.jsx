import { getMe } from "@/features/auth/authSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/img/profile.png";
import usePreviewImage from "@/hooks/usePreviewImage";
import ModalUpdateProfile from "@/components/profilepage/ModalUpdateProfile";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-x-2 p-2 bg-orange-400">
          <img
            src={user?.profilePic ||  profile}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="">
            <p className="font-semibold ">{user?.name}</p>
            <p>{user?.email}</p>
          </div>
         <ModalUpdateProfile nameUser={user?.name} img={user?.profilePic}/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
