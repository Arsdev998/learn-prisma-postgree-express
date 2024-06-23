import { get } from "@/hooks/api";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ListDestinasi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
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
  const truncatetext = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <div className="flex flex-col  gap-2 ">
      {data.map((dest) => (
        <div className="flex w-[950px] items-center" key={dest.id}>
          <img
            src={dest.coverimg}
            alt=""
            className="w-[280px] h-[280px] object-cover rounded-md"
          />
          <div className="flex flex-col gap-y-4 p-4">
            <h2 className="text-red-700 text-xl font-bold">{dest.name}</h2>
            <p className="text-clip overflow-hidden">
              {truncatetext(dest.description, 255)}
            </p>
            <div className="flex gap-4">
              <Button className="p-1 bg-orange-500 ">{dest.provinsi}</Button>
              <Button className="p-1 bg-orange-500">
                Kabupaten {dest.kabupaten}
              </Button>
              <Button className="p-1 bg-orange-500">
                Kecamatan {dest.kecematan}
              </Button>
            </div>
          </div>
          <div className="">
            <Button>
              <Link to={`/destinasi/${dest.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListDestinasi;
