import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Nav = ({ className }) => {
  return (
    <nav className={`${className}`}>
      <ul className="flex flex-col md:flex-row gap-5 items-center px-5">
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link>Destinasi</Link>
        </li>
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link>About</Link>
        </li>
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link>Contact</Link>
        </li>
        <li className="font-medium text-md text-[#05073C] transition hover:text-[#EB662B]">
          <Link to={'/register'}>Sign up</Link>
        </li>
        <li>
          <Link to={'/login'}>
            <Button varian>Login</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;