import { get } from "@/hooks/api";
import React, { useEffect, useState } from "react";

const  ListDestinasi = () => {
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

  console.log(data);
  return (
    <div className="flex flex-col gap-2 ">
      {data.map((dest) => (
        <div className="flex w-[950px]" key={dest.id}>
          <img
            src={dest.coverimg}
            alt=""
            className="w-[280px] h-[280px] object-cover rounded-md"
          />
          <div className="p-3">
            <h2 className="text-red-700">{dest.name}</h2>
            <p>{dest.description}</p>
            <p>Provinsi : {dest.provinsi}</p>
            <p>Kabupaten: {dest.kabupaten}</p>
            <p>Kabupaten: {dest.kecematan}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListDestinasi;
