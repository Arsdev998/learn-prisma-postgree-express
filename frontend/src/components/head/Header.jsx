import React from "react";
import Nav from "./Nav";
import DarkTogle from "./DarkTogle";
import logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FaSearchLocation } from "react-icons/fa";

const Header = () => {
  return (
    <header className=" w-full lg:w-[1300px] md:mx-auto  md:py-4 sticky  top-0 bg-white bg-opacity-75">
      <div className="flex justify-around md:justify-between  items-center">
        <div className="flex gap-10 items-center">
          <Link to={"/"}>
            <img src={logo} alt="" className="w-[150px]" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden">
              <FaSearchLocation />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <input
                type="text"
                placeholder="Cari Destinasi"
                className="rounded-xl  border-2  px-1 outline-[#EB662B] z-[8999]"
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            type="text"
            placeholder="Cari Destinasi"
            className="rounded-xl hidden md:block  border-2  px-1 mt-1 outline-[#EB662B]"
          />
        </div>
        <div className="flex  md:gap-5 items-center">
          <Nav className={"hidden md:block"} />
          <DarkTogle />
          <div className="md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;