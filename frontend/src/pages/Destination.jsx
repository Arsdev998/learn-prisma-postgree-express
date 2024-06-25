import ListDestinasi from "@/components/destinasi/ListDestinasi";
import SideBar from "@/components/destinasi/SideBar";
import { BreadCrumbs } from "@/components/head/BreadCrums";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Destination = () => {
  const location = useLocation()
  return (
    <>
      <section className="flex flex-col justify-center items-center px-10 lg:px-20 xl:px-40">
        <div className="flex justify-between w-full mt-2">
          <BreadCrumbs currentLoc={'Destinasi'}/>
          <p className="text-gray-800 text-xl font-semibold">Explore Semua Hal yang Bisa Dilakukan di Phuket</p>
        </div>
        <div className="flex gap-x-5">
          <SideBar/>
          <ListDestinasi/>
        </div>
      </section>
    </>
  );
};

export default Destination;
