import Comment from "@/components/DestinasiDetail/comment/Comment";
import FavButton from "@/components/DestinasiDetail/favorites/FavButton";
import { BreadCrumbs } from "@/components/head/BreadCrums";
import Rating from "@/components/profilepage/Rating";
import { Button } from "@/components/ui/button";
import { getById } from "@/hooks/api";
import React, { useEffect, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { useSelector } from "react-redux";

const DestinationDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDestinasiDetail = async () => {
      try {
        const response = await getById("/wisata/" + id);
        setData(response);
        setLoading(false);
        const ratings = response.ratings;
        if (ratings.length > 0) {
          const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
          const average = total / ratings.length;
          setAverageRating(average);

          // Check if the current user has rated this destination
          const userRating = ratings.find(
            (rating) => rating.userId === user?.id
          );
          setUserRating(userRating);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDestinasiDetail();
  }, [id, user]);

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
              target="_blank"
              to={data.maps}
              className="font-bold flex items-center gap-x-1"
            >
              <FaMapMarkedAlt className="text-orange-500 text-xl" />
            </Link>
            <FavButton wisataId={id} />
          </div>
          <div className="w-[70%]">
            <p className="flex items-center font-bold">
              Rating:{" "}
              <span  className="flex  items-center text-orange-600" >{averageRating.toFixed(1)}/5 <IoIosStar className="mt-[1px]"/></span>
             
            </p>
            <p className="font-semibold ">
              <span className="text-orange-500">{data.favorites?.length}</span>{" "}
              Orang menambahkan Destinasi ini ke Favorite Mereka
            </p>
            <h2 className="font-bold text-2xl ">Tentang Destinasi Wisata</h2>
            <p className="font-semibold">{data.description}</p>
            <div className="flex gap-x-2">
              <p className="font-semibold">
                {" "}
                <span className="text-orange-500">
                  {data.comments?.length}{" "}
                </span>
                komentar
              </p>
              <p className="font-semibold">
                {" "}
                <span className="text-orange-500">{data.ratings?.length} </span>
                Orang memberikan rating
              </p>
            </div>
            {userRating ? (
              <p className="flex gap-x-1 font-semibold">
                Rating yang anda berikan : <span className="text-okegas flex items-center">{userRating.value}/5 <IoIosStar/></span>{" "}
              </p>
            ) : (
              <Rating wisataId={data.id} />
            )}
            <Comment commentId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
