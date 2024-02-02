import { Button, Select, TextInput } from "flowbite-react";
import AllBlogCard from "./AllBlogCard";
import useCategoriesApi from "../../hooks/useCategoriesApi";
import SkeletonLoading from "../Loadings/SkeletonLoading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const AllBlogs = () => {
  const [searchCategory, setSearchCategory] = useState("");
  // console.log(searchCategory);
  const searchByCategory = (e) => {
    // console.log("change selected option");
    setSearchCategory(e.target.value);
  };

  const [searchTitle, setSearchTitle] = useState("");
  console.log(searchTitle);

  const searchByTitle = (e) => {
    e.preventDefault();

    // setSearchTitle(e.target.title.value.toLowerCase());
    setSearchTitle(e.target.title.value);
  };
  // all blogs
  const { isPending, error, data } = useCategoriesApi();
  const axios = useAxios();
  const getBlogs = async () => {
    const res = await axios.get(
      `/all-blogs?sortDate=currentTime&sortOrder=desc&category=${searchCategory}&sortTitle=${searchTitle}`
    );
    return res;
  };

  const {
    isFetching,
    isLoading,
    isError,
    error: blogError,
    data: blogs,
  } = useQuery({
    queryKey: ["allblogs", searchCategory, searchTitle],
    queryFn: getBlogs,
  });
  // const [searchTitle, setSearchTitle] = useState("");
  // console.log(searchTitle);
  // const searchByTitle = (e) => {
  //   e.preventDefault();
  //   const userInput = e.target.title.value;
  //   const userInputToLower = userInput.toLowerCase();
  //   // console.log(userInputToLower);
  //   // setSearchTitle(e.target.title.value);
  //   const filterBlog = blogs?.data.filter((item) =>
  //     item.title.toLowerCase().includes(userInputToLower)
  //   );
  //   return filterBlog;
  // };
  // console.log(searchTitle);

  // console.log(data?.data);
  // if (isError) {
  //   return <p>data not loaded</p>;
  // }
  // console.log(blogs?.data);
  return (
    <div>
      <h2 className="my-4 text-2xl font-semibold bg-[#155e75] w-full py-4 text-white text-center rounded-lg">
        All Blogs
      </h2>
      <div className="flex justify-between mb-4 border-b border-[#155E75] pb-2">
        <div>
          <Select onChange={searchByCategory} className="cursor-pointer">
            <option className="my-1" value="">
              Select Category
            </option>
            {data?.map((category) => (
              <option className="cursor-pointer" key={category._id}>
                {category.category}
              </option>
            ))}
          </Select>
        </div>
        <form onSubmit={searchByTitle}>
          <div className="flex">
            <TextInput name="title" placeholder="Search by Title"></TextInput>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>

      {blogs?.data == 0 ? (
        isFetching ? (
          <SkeletonLoading />
        ) : (
          <h3 className="text-3xl py-9 w-full flex items-center justify-center font-semibold text-gray-400 min-h-[500px]">
            This category has no data!
          </h3>
        )
      ) : isFetching ? (
        <h3 className="text-3xl py-9 w-full flex items-center justify-center font-semibold text-gray-400 min-h-[500px]">
          Try to fetching data....
        </h3>
      ) : isError ? (
        <h3 className="text-3xl py-9 w-full flex items-center justify-center font-semibold text-gray-400 min-h-[500px]">
          Data not fetched!
        </h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {blogs?.data?.map((blog, index) => (
            <AllBlogCard key={blog._id} blog={blog} index={index}></AllBlogCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
