import { Button, Label, Textarea } from "flowbite-react";
import img from "/banner01.jpg";
import BlogComments from "./BlogComments";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import SkeletonLoading from "../Loadings/SkeletonLoading";
import useAxios from "../../hooks/useAxios";
const BlogDetails = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const loadedBlog = useLoaderData();
  // console.log(loadedBlog);
  const { title, _id, short_desc, category, long_desc, image, user_email } =
    loadedBlog;
  const commentHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.comment.value);
    const comment = {
      comment: e.target.comment.value,
      id: _id,
      user_name: user?.displayName,
      user_img: user?.photoURL,
      user_email: user?.email,
    };
    const toastId = toast.loading("Commenting....");

    axios
      .post("/post-comment", comment)
      .then((res) => {
        // console.log(res);
        toast.success("Comment send successfully!", { id: toastId });
        e.target.comment.value = "";
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Comment not send!", { id: toastId });
      });
  };

  // get comments by post id
  const getComments = async () => {
    const res = await axios.get(`/comment-by-post/${_id}`);
    return res;
  };
  const { isPending, error, data, refetch, isSuccess } = useQuery({
    queryKey: ["comments", _id],
    queryFn: getComments,
  });
  if (isPending) {
    return <SkeletonLoading />;
  }
  if (error) {
    return <p>Data not found</p>;
  }
  if (isSuccess) {
    refetch();
  }
  // console.log(data?.data);
  return (
    <div className="my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border px-5 py-7 rounded-xl">
        <div>
          <img
            className="rounded-lg w-full"
            src={image ? image : img}
            alt="blog image"
          />
        </div>
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="my-4 text-[#0e7490]">{category}</p>
          <p className=" text-gray-700 dark:text-gray-600 font-semibold my-3">
            {short_desc}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-justify leading-relaxed mb-4">
            {long_desc}
          </p>
          {user?.email == user_email ? (
            <Link className="inline-block" to={`/update-blog/${_id}`}>
              <Button>Update</Button>
            </Link>
          ) : (
            ""
          )}
          {/* <Link  to={`/update-blog/${_id}`}>
            <Button>Update</Button>
          </Link> */}
        </div>
      </div>

      <div className="mt-6 max-w-xl">
        {user_email == user?.email ? (
          <h3 className="text-center font-semibold text-2xl text-red-400 mt-8">
            Owner can not comment on own blog
          </h3>
        ) : (
          <form onSubmit={commentHandler}>
            <Label
              value="Sent Your Feedback to us..."
              className="font-semibold text-lg"
            ></Label>
            <Textarea
              name="comment"
              className="w-full my-4"
              placeholder="Type Your Feedback....."
              required
              rows={8}
            />
            <Button type="submit">Post</Button>
          </form>
        )}
      </div>
      <div className="mt-8 ">
        <h2 className="font-semibold text-xl text-center border-b border-[#155e75] pb-3 mb-4">
          All Comments
        </h2>
        <div>
          {data?.data == 0 ? (
            <h3 className="text-center font-semibold text-3xl text-gray-400 mt-8">
              No Comments
            </h3>
          ) : (
            data?.data?.map((comment) => (
              <BlogComments key={comment._id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
