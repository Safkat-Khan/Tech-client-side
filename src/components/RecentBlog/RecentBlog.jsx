import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import SkeletonLoading from "../../pages/Loadings/SkeletonLoading";
import useAxios from "../../hooks/useAxios";

const RecentBlog = () => {
  const axios = useAxios();
  const getRecentBlogs = async () => {
    const res = await axios.get(
      "/all-blogs?sortDate=currentTime&sortOrder=desc&limit=6"
    );
    return res;
    // console.log(res.data);
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["recent-blog"],
    queryFn: getRecentBlogs,
  });
  if (isPending) {
    return <SkeletonLoading></SkeletonLoading>;
  }
  // console.log(data?.data);
  return (
    <div className="my-10 overflow-hidden">
      <h2 className="text-center border-b-2 pb-2 font-semibold text-3xl text-[#155E75]">
        LATEST BLOGS
      </h2>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.map((blogs, index) => (
          <BlogCard key={blogs._id} blogs={blogs} index={index}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default RecentBlog;
