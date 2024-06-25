import Comment from "@/components/DestinasiDetail/comment/Comment";
import FavButton from "@/components/DestinasiDetail/favorites/FavButton";
import { BreadCrumbs } from "@/components/head/BreadCrums";
import { Button } from "@/components/ui/button";
import { getById, post, remove } from "@/hooks/api";
import React, { useEffect, useState } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const DestinationDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinasiDetail = async () => {
      try {
        const response = await getById("/wisata/" + id);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDestinasiDetail();
  }, [id]);

  console.log(data);
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="container mx-auto">
          <BreadCrumbs
            prevlocation={"Destinasi"}
            href={"/destinasi"}
            currentLoc={data.name}
          />
          <div className="flex gap-2">
            <img
              src={data.coverimg}
              alt={data.name}
              className="w-[770px] h-[510px] object-cover"
            />
            {data.images && data.images.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                <img
                  src={data.images[0].url}
                  alt={data.name}
                  className="w-[500px] h-[300px] object-cover"
                />
                <div className="flex gap-x-2 relative">
                  <img
                    src={data.images[1]?.url || "asek"}
                    alt=""
                    className="w-[245px] h-[200px] object-cover"
                  />
                  <img
                    src={data.images[2]?.url || "asek"}
                    alt=""
                    className="w-[245px] h-[200px] object-cover"
                  />
                  <Button className="absolute right-2 bottom-2 bg-orange-500">
                    See All photos
                  </Button>
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <h1 className="text-3xl font-bold my-2">{data.name}</h1>
          <div className="flex gap-10 items-center">
            <p className="font-bold">
              Provinsi <span className="text-orange-500"> {data.provinsi}</span>
            </p>
            <p className="font-bold">
              Kabupaten{" "}
              <span className="text-orange-500">{data.kabupaten}</span>
            </p>
            <p className="font-bold">
              Kecamatan{" "}
              <span className="text-orange-500">{data.kecematan}</span>
            </p>
            <Link
              to={data.maps}
              className="font-bold flex items-center gap-x-1"
            >
              <FaMapMarkedAlt className="text-orange-500 text-xl" />
            </Link>
            <FavButton wisataId={id} />
          </div>
          <div className="w-[70%]">
            <p className="font-semibold ">
              <span className="text-orange-500">{data.favorites?.length}</span>{" "}
              Orang menambahkan Destinasi ini ke Favorite Mereka
            </p>
            <h2 className="font-bold text-2xl ">Tentang Destinasi Wisata</h2>
            <p className="font-semibold">{data.description}</p>
            <p className="font-semibold">
              {" "}
              <span className="text-orange-500">{data.comments?.length} </span> Orang berkomentar
            </p>
            <Comment commentId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
