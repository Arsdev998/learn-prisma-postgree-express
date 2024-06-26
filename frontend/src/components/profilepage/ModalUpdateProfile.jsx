import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import usePreviewImage from "@/hooks/usePreviewImage";
import { Avatar, AvatarImage } from "../ui/avatar";
import { put } from "@/hooks/api";
import { toast } from "sonner";
import { IoReload } from "react-icons/io5";

const ModalUpdateProfile = ({ img, nameUser }) => {
  const { handleImageChange, imgUrl } = usePreviewImage();
  const [name, setName] = useState(nameUser);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("name", name);
      if (fileRef.current && fileRef.current.files[0]) {
        formData.append("profilePic", fileRef.current.files[0]);
      }

      // Logging untuk memastikan FormData tidak kosong
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const update = await put("/auth/update", formData);
      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <Avatar>
              <AvatarImage src={imgUrl || img} />
            </Avatar>
            <Input type="file" onChange={handleImageChange} ref={fileRef} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled>
                Please Wait <IoReload className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateProfile;
