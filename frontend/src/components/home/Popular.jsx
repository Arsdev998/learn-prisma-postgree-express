import banner from "@/data/data";
import React from "react";

const Popular = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-7 mx-auto">
      <h1 className="font-bold text-xl mb-1">Tempat Wisata Populer</h1>
      <div className="flex gap-3 flex-wrap justify-center">
        {banner.map((bnr) => (
          <div
            className="w-[350px] md:w-[400px] h-[250px] relative hover:scale-105 transition-all cursor-pointer"
            key={bnr.src}
          >
            <img
              src={bnr.src}
              alt=""
              className="w-full h-full object-cover overflow-hidden rounded-[30px]"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <p className="font-bold text-white shadow-md drop-shadow-md text-center z-10">
                {bnr.title}
              </p>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 hover:bg-opacity-30 rounded-[30px]"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;