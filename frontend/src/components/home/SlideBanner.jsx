import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import banner from "@/data/data";



const SlideBanner = () => {
  return (
    <>
      <Carousel className="w-[420px] lg:w-[1300px] h-[300px] md:h-[400px] relative overflow-hidden">
        <CarouselContent className="w-full h-full">
          {banner.map((bnr) => (
            <CarouselItem key={bnr.src} className="h-full w-full relative">
              <img
                src={bnr.src}
                alt={bnr.title}
                className="object-cover w-full h-[300px] md:h-[400px]"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center">
                <div className="text-white text-center">
                  <h2 className="text-4xl font-bold text-center">{bnr.title}</h2>
                  <p className="mt-4 font-bold shadow-md drop-shadow text-xl">
                    Kabupaten {bnr.city}
                  </p>
                  <button className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg">
                    Explore
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 transform -translate-y-1/2 ml-4 bg-orange-500 p-2 text-white rounded-full shadow-md cursor-pointer" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 bg-orange-500 text-white p-2 rounded-full shadow-md cursor-pointer" />
      </Carousel>
    </>
  );
};

export default SlideBanner;