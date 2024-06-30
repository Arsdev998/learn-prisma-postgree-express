import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import profile from "@/assets/img/profile.png";
import { formatDistanceToNowStrict, isValid } from "date-fns";
import { getById, post, put, remove } from "@/hooks/api";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/features/auth/authSlice";

const Comment = ({ commentId }) => {
  const [comments, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

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
      return toast.warning("Kamu harus login terlebih dahulu");
    }
    try {
      if (editCommentId) {
        const updateContent = { content: editContent };
        const response = await put(
          `/wisata/comments/${editCommentId}`,
          updateContent
        );
        setComment((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editCommentId
              ? { ...comment, content: editContent }
              : comment
          )
        );
        console.log(response);
        setEditCommentId(null);
        setEditContent("");
        toast.success("Komentar Di update");
      } else {
        const newContent = { content };
        const response = await post(
          `/wisata/comments/${commentId}`,
          newContent
        );
        setComment((prevComments) => [...prevComments, response.comment]);
        setContent("");
        toast.success("Komentar terkirim");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal bro");
    }
  };

  const handleDelete = async (cmnId) => {
    try {
      await remove(`/wisata/comments/${cmnId}`);
      setComment((prevComments) =>
        prevComments.filter((comment) => comment.id !== cmnId)
      );
      toast.success("Komentar Dihapus");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus komentar");
    }
  };

  const sortedComments =
    comments.length > 0
      ? comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [];

  const handleEditComment = (commentId, commentContent) => {
    setEditCommentId(commentId);
    setEditContent(commentContent);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
  };

  console.log(editCommentId);

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
            value={editCommentId ? editContent : content}
            onChange={(e) => {
              if (editCommentId) {
                setEditContent(e.target.value);
              } else {
                setContent(e.target.value);
              }
            }}
            className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <Button type="submit">
            {editCommentId ? "Perbarui Komentar" : "Kirim Komentar"}
          </Button>
          {editCommentId && <Button onClick={handleCancelEdit}>Batal</Button>}
        </form>
        {loading ? (
          <p>loading...</p>
        ) : sortedComments.length === 0 ? (
          <p>Belum ada komentar</p>
        ) : (
          <div className="flex flex-col gap-y-2 p-2">
            {sortedComments.map((cmn) => (
              <div key={cmn.id} className="p-2 bg-slate-200 w-[50%]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={cmn?.user.profilePic || profile}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full "
                    />
                    <p className="font-bold">{cmn?.user.name}</p>
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
                            <Button
                              onClick={() =>
                                handleEditComment(cmn.id, cmn.content)
                              }
                            >
                              Edit
                            </Button>
                          </div>
                        )}
                        <Button className="bg-red-600">Laporkan</Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="font-semibold">{cmn?.content}</p>
                <p className="ml-[80%]">
                  {isValid(new Date(cmn.updatedAt))
                    ? formatDistanceToNowStrict(new Date(cmn.updatedAt))
                    : "Invalid date"}
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
