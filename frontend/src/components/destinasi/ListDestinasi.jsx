import { get } from "@/hooks/api";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { SiGooglemaps } from "react-icons/si";
import { IoStar } from "react-icons/io5";
import FavButton from "../DestinasiDetail/favorites/FavButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const ListDestinasi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchDestinasi = async () => {
      try {
        const response = await get("/wisata");
        setData(response);
      } catch (err) {
        setError(err.message || "Error fetching data");
      }
    };
    fetchDestinasi();
  }, []);

  const calculateAverageRating = (ratings) => {
    if (ratings.length > 0) {
      const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
      return total / ratings.length;
    }
    return 0;
  };

  const indexOflastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOflastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOflastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-4 p-6">
      {currentItems.map((dest) => {
        const averageRating = calculateAverageRating(dest.ratings);
        return (
          <div
            key={dest.id}
            className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={dest.coverimg}
              alt={dest.name}
              className="w-full md:w-1/3 h-48 md:h-[250px] object-cover"
            />
            <div className="flex flex-col justify-between p-4 w-full">
              <div>
                <h2 className="text-2xl font-bold font-sans mb-2">
                  {dest.name}
                </h2>
                <p className="flex items-center font-semibold text-sm">
                  <SiGooglemaps /> {dest.provinsi}, Kabupaten {dest.kabupaten},
                  Kecamatan {dest.kecematan}
                </p>
                <div className="flex items-center gap-x-2 mt-2">
                  <p className="flex items-center border-solid border-2 p-1 border-orange-500 rounded-lg font-bold w-max">
                    {averageRating.toFixed(1)} / 5{" "}
                    <IoStar className="text-okegas ml-1" />
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold">Dari</span>{" "}
                    {dest.ratings?.length} Orang
                  </p>
                </div>
              </div>
              <div className="flex j gap-x-2 items-center mt-4">
                <div className="">
                  <FavButton
                    wisataId={dest.id}
                    className={
                      " border-solid border-2 p-[10px] border-orange-500 rounded-lg font-bold w-max"
                    }
                  />
                </div>
                <Link to={`/destinasi/${dest.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {error && <p className="text-red-500">{error}</p>}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
            (number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  isActive={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ListDestinasi;
