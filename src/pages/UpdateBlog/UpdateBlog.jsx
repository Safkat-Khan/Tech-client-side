import {
  Button,
  Card,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Providers/AuthProviders";
import useCategoriesApi from "../../hooks/useCategoriesApi";
import SkeletonLoading from "../Loadings/SkeletonLoading";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const goToDetails = useNavigate();
  const axios = useAxios();
  const { isPending, error, data } = useCategoriesApi();
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("en-US", { month: "short" });
  const year = currentDate.getFullYear();
  const todayDate = `${day}-${month}-${year}`;
  const { user } = useContext(AuthContext);
  const loadedBlog = useLoaderData();
  // console.log(loadedBlog);
  const { title, _id, short_desc, category, long_desc, image } = loadedBlog;
  const formHandler = (e) => {
    e.preventDefault();
    const blogInfo = {
      title: e.target.title.value,
      short_desc: e.target.short_desc.value,
      long_desc: e.target.long_desc.value,
      category: e.target.category.value,
      image: e.target.image.value,
      user_email: user?.email,
      last_updated: todayDate,
      user_img: user.photoURL,
      user_name: user.displayName,
    };
    // console.log(blogInfo);
    axios
      .put(`/blog-update/${_id}`, blogInfo)
      .then((res) => {
        // console.log(res.data);
        toast.success("Blog Updated Successfully!");
        goToDetails(`/blog-details/${_id}`);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Blog Not Updated!");
      });
  };
  if (isPending) {
    return <SkeletonLoading />;
  }
  if (error) {
    return <p>Data not found</p>;
  }
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto my-10">
      <h2 className="text-2xl mb-8 border-b-2 pb-3 font-semibold mt-4">
        Update Your Blog
      </h2>
      <div>
        <Card className="my-4">
          <form onSubmit={formHandler} className="flex w-96 flex-col gap-4 ">
            <div>
              <div className="mb-2 block">
                <Label value="Title" />
              </div>
              <TextInput
                defaultValue={title}
                name="title"
                type="text"
                placeholder="Write Title..."
                //   required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Sort Description" />
              </div>
              <TextInput
                defaultValue={short_desc}
                name="short_desc"
                type="text"
                placeholder="Write Short description.."
                //  required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Description" />
              </div>
              <Textarea
                rows={10}
                defaultValue={long_desc}
                name="long_desc"
                type="text"
                placeholder="Write description.."
                //  required
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label value="Select Your Category" />
              </div>
              <Select name="category" required>
                <option>{category}</option>
                {data?.map((category) => (
                  <option key={category._id}>{category.category}</option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Image" />
              </div>
              <TextInput
                defaultValue={image}
                name="image"
                type="text"
                placeholder="User not set any image URL"
                //  required
              />
            </div>
            <Button type="submit">Update Blog</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
