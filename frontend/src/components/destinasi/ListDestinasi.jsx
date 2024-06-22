import { get } from "@/hooks/api";
import React, { useEffect, useState } from "react";

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

  console.log(data);
  return (
    <div className="flex">
      {data.map((dest) => (
        <div className="" key={dest.id}>
          <p className="text-red-700">{dest.name}</p>
          <img src={dest.coverimg} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ListDestinasi;
