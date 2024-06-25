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

const FavoriteUser = ({ userId }) => {
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  console.log(favData);
  return (
    <div>
      {loading ? (
        <p>Loading wak</p>
      ) : favData.length === 0 ? (
        <p>Kamu belum menambahkan ke favorite</p>
      ) : (
        <div className="flex flex-col gap-y-2">
          {favData.map((fav) => (
            <div
              className="flex items-center gap-x-2 bg-orange-300"
              key={fav.id}
            >
              <img
                src={fav.wisata.coverimg}
                alt=""
                className="w-[250px] h-[250px] object-cover"
              />
              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-red-700 font-bold text-xl">
                    {fav.wisata.name}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MdDelete className="text-red-600 mr-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-transparent  border-none">
                        <Button className="bg-red-600 hover:bg-red-500">Hapus?</Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button>Provinsi {fav.wisata.provinsi}</Button>
                  <Button>Kabupaten {fav.wisata.kabupaten}</Button>
                  <Button>Kecematan {fav.wisata.kecematan}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteUser;
