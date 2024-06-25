import React, { useState } from "react";
import Nav from "./Nav";

import { GiHamburgerMenu } from "react-icons/gi";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <button className="lg:hidden flex flex-col gap-1" onClick={toggleMenu}>
<GiHamburgerMenu />
      </button>
      <div
        className={`absolute top-12 right-0 bg-white shadow-lg rounded-lg ${
          isOpen ? "block z-[9999]" : "hidden"
        }`}
      >
        <Nav />
      </div>
    </div>
  );
};

export default HamburgerMenu;