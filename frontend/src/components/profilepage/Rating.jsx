import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { post } from "@/hooks/api";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { IoStar } from "react-icons/io5";
import { Button } from "../ui/button";

const Rating = ({ wisataId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = async (value) => {
    setRating(value);
    try {
      const data = { value, wisataId };
      const response = await post(`/wisata/rattings`, data);
      toast.success("Rating berhasil ditambahkan");
    } catch (error) {
      console.error("Failed to submit rating", error);
      toast.error("Gagal menambahkan rating");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex gap-x-2 items-center">
          Tambahkan Ratting <IoStar className="text-white mt-[1px]"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Rating;
