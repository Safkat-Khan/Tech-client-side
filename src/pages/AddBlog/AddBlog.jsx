import {
  Button,
  Card,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import useCategoriesApi from "../../hooks/useCategoriesApi";
import SkeletonLoading from "../Loadings/SkeletonLoading";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const AddBlog = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("en-US", { month: "short" });
  const year = currentDate.getFullYear();
  const todayDate = `${day}-${month}-${year}`;
  // console.log(todayDate);
  // console.log(currentTime);
  // console.log(user?.email);
  const { isPending, error, data } = useCategoriesApi();
  // console.log(data);
  const formHandler = (e) => {
    e.preventDefault();
    const blogInfo = {
      title: e.target.title.value,
      short_desc: e.target.short_desc.value,
      long_desc: e.target.long_desc.value,
      category: e.target.category.value,
      image: e.target.image.value,
      user_email: user?.email,
      currentTime,
      todayDate,
      user_img: user.photoURL,
      user_name: user.displayName,
    };
    const toastId = toast.loading("Blog adding...");
    // console.log(blogInfo);
    axios
      .post("/post-blog", blogInfo)
      .then((res) => {
        // console.log(res.data);
        toast.success("Blog added successfully!", { id: toastId });
        e.target.reset();
      })
      .catch((err) => {
        toast.error("Blog not added!", { id: toastId });
      });
  };
  if (isPending) {
    return <SkeletonLoading />;
  }
  if (error) {
    return <p>data not loaded</p>;
  }
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto my-10">
      <h2 className="text-2xl mb-8 border-b-2 pb-3 font-semibold mt-4">
        Add Your Blog
      </h2>
      <div>
        <Card className="my-4">
          <form onSubmit={formHandler} className="flex w-96 flex-col gap-4 ">
            <div>
              <div className="mb-2 block">
                <Label value="Title" />
              </div>
              <TextInput
                name="title"
                type="text"
                placeholder="Write Title..."
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Sort Description" />
              </div>
              <TextInput
                name="short_desc"
                type="text"
                placeholder="Write Short description.."
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Description" />
              </div>
              <Textarea
                rows={10}
                name="long_desc"
                type="text"
                placeholder="Write description.."
                required
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label value="Select Your Category" />
              </div>
              <Select name="category" required>
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
                name="image"
                type="text"
                placeholder="Past Image URL"
                //  required
              />
            </div>
            <Button type="submit">Add Blog</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddBlog;
