import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "@/features/auth/authSlice";
import profile from "../../assets/img/profile.png";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FiLogOut } from "react-icons/fi";

const Nav = ({ className }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className={`${className}`}>
      <ul className="flex flex-col md:flex-row gap-5 items-center px-5">
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link to="/destinasi">Destinasi</Link>
        </li>
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link to="/about">About</Link>
        </li>
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link to="/contact">Contact</Link>
        </li>
        {isAuthenticated ? (
          <li className="flex items-center gap-x-4">
            <Link to={"/profile"}>
              <Avatar>
                <AvatarImage
                  src={user?.profilePic || profile}
                  className="object-cover"
                />
              </Avatar>
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut  className="text-xl text-okegas" />
            </button>
          </li>
        ) : (
          <ul className="flex items-center gap-2">
            <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
              <Link to="/register">Sign up</Link>
            </li>
            <li>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
