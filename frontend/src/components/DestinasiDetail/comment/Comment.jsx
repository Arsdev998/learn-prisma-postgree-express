import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import profile from "@/assets/img/profile.png";
import { formatDistanceToNowStrict } from "date-fns";
import { getById, post, remove } from "@/hooks/api";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/features/auth/authSlice";
import { Modal } from "@/components/modal/Modal";
const Comment = ({ commentId }) => {
  const [comments, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCommentWisata = async () => {
      try {
        const response = await getById("/wisata/comments/" + commentId);
        setComment(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCommentWisata();
  }, [commentId]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return <Modal />;
    }
    try {
      const newContent = { content };
      const sendComment = await post(
        `/wisata/comments/${commentId}`,
        newContent
      );
      setComment((prevComments) => [...prevComments, sendComment]);
      setContent("");
      toast.success("Komen Terkirim");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (cmnId) => {
    try {
      await remove(`/wisata/comments/${cmnId}`);
      setComment((prevComments) =>
        prevComments.filter((comment) => comment.id !== cmnId)
      );
      toast.success("Komen Dihapus");
    } catch (error) {
      console.log(error);
      // showToast("Failed to delete comment", "error");
    }
  };

  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-2">
          Komentar orang tentang Destinasi ini
        </h2>
        <form onSubmit={handleComment} className="flex items-center gap-x-2">
          <textarea
            name=""
            id=""
            required
            placeholder="Tambahkan Komentar"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <Button>Kirim Komentar</Button>
        </form>
        {loading ? (
          <p>loading...</p>
        ) : sortedComments.length === 0 ? (
          <p>Belum ada komentar</p>
        ) : (
          <div className="flex flex-col gap-y-2 p-2">
            {sortedComments.map((cmn) => (
              <div key={cmn.createdAt} className="p-2 bg-slate-200 w-[50%]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={cmn.user.profilePic || profile}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full "
                    />
                    <p className="font-bold">{cmn.user.name}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <div className="flex flex-col gap-y-2 bg-transparent">
                        {user && user.id === cmn.userId && (
                          <div className="flex flex-col gap-y-2">
                            <Button onClick={() => handleDelete(cmn.id)}>
                              Hapus
                            </Button>
                            <Button>Edit</Button>
                          </div>
                        )}
                        <Button className="bg-red-600">Laporkan</Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="font-semibold">{cmn.content}</p>
                <p className="ml-[80%]">
                  {formatDistanceToNowStrict(new Date(cmn.createdAt))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
