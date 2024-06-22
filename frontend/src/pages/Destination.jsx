import ListDestinasi from "@/components/destinasi/ListDestinasi";
import SideBar from "@/components/destinasi/SideBar";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Destination = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center px-10 lg:px-20 xl:px-40">
        <div className="flex justify-between w-full mt-2">
          <p className="flex items-center text-gray-600 text-sm">
            Home <FaArrowRight className="mx-2" /> Destinasi
          </p>
          <p className="text-gray-800 text-xl font-semibold">Explore Semua Hal yang Bisa Dilakukan di Phuket</p>
        </div>
        <div className="flex">
          <SideBar/>
          <ListDestinasi/>
        </div>
      </section>
    </>
  );
};

export default Destination;
