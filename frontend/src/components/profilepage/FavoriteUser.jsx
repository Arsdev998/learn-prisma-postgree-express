import { get } from "@/hooks/api";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { GiDefenseSatellite } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { deleteFavorite } from "@/features/auth/favoritesSlice";
import { Link } from "react-router-dom";
import { SiGooglemaps } from "react-icons/si";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const FavoriteUser = ({ userId }) => {
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerpage = 6;

  useEffect(() => {
    const fetchfavUser = async () => {
      try {
        const response = await get(`/wisata/favorites/${userId}`);
        setFavData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchfavUser();
  }, [userId]);
  const handleDelete = async (wisataId) => {
    try {
      await dispatch(deleteFavorite(wisataId)).unwrap();
      setFavData((prevFav) =>
        prevFav.filter((fav) => fav.wisata.id !== wisataId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastItems = currentPage * itemsPerpage;
  const indexOfFirstItems = indexOfLastItems - itemsPerpage;
  const currentItems = favData.slice(indexOfFirstItems, indexOfLastItems);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <p>Loading wak</p>
      ) : favData.length === 0 ? (
        <p>Kamu belum menambahkan ke favorite</p>
      ) : (
        <div className="flex flex-col gap-y-2">
          {currentItems.map((fav) => (
            <div
              key={fav.id}
              className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={fav.wisata.coverimg}
                alt={fav.wisata.name}
                className="w-full md:w-1/3 h-48 md:h-[250px] object-cover"
              />
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h2 className="text-2xl font-bold font-sans mb-2">
                    {fav.wisata.name}
                  </h2>
                  <p className="flex items-center font-semibold text-sm">
                    <SiGooglemaps /> {fav.wisata.provinsi}, Kabupaten{" "}
                    {fav.wisata.kabupaten}, Kecamatan {fav.wisata.kecematan}
                  </p>
                  <div className="flex items-center gap-x-2 mt-2">
                    {/* <p className="flex items-center border-solid border-2 p-1 border-orange-500 rounded-lg font-bold w-max">
                      {averageRating.toFixed(1)} / 5{" "}
                      <IoStar className="text-okegas ml-1" />
                    </p> */}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 gap-x-2">
                  <Button
                    className="bg-red-600 hover:bg-red-400"
                    onClick={() => handleDelete(fav.wisata.id)}
                  >
                    <MdDelete />
                  </Button>
                  <Link to={`/destinasi/${fav.wisata.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(Math.ceil(favData.length / itemsPerpage)).keys()].map(
            (number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  isActive={currentPage + 1 === currentPage}
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
              disabled={
                currentPage === Math.ceil(favData.length / itemsPerpage)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default FavoriteUser;
