import { getMe } from "@/features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/img/profile.png";
import ModalUpdateProfile from "@/components/profilepage/ModalUpdateProfile";
import FavoriteUser from "@/components/profilepage/FavoriteUser";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import cover from "../assets/img/cover.png";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <div className="flex flex-col items-center  w-full">
        <div className="flex flex-col items-center w-[80%] h-[300px] bg-coverProfile">
          <img
            src={user?.profilePic || profile}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover mt-10"
          />
          <div className="flex flex-col items-center">
            <p className="font-bold text-slate-700">{user?.name}</p>
            <p className="font-semibold text-slate-500 font-mono">
              {user?.email}
            </p>
          </div>
          <ModalUpdateProfile nameUser={user?.name} img={user?.profilePic} />
        </div>
        <div className="mt-40 w-full flex justify-center">
          <Tabs defaultValue="comment" className="w-[700px]">
            <TabsList className="flex justify-around">
              <TabsTrigger value="comment">Komentar</TabsTrigger>
              <TabsTrigger value="favorite">Favorite</TabsTrigger>
            </TabsList>
            <TabsContent value="comment">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
              corrupti porro optio asperiores et in! Quod ipsam, aliquid
              mollitia soluta laborum aut? Quas necessitatibus ipsum earum
              laudantium esse velit maxime!
            </TabsContent>
            <TabsContent value="favorite">
              <FavoriteUser userId={user?.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
