import { Button } from "flowbite-react";
import img from "/blog-placeholder.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { PhotoProvider, PhotoView } from "react-photo-view";
import useAxios from "../../hooks/useAxios";
import { LazyMotion, domAnimation, motion } from "framer-motion";

const BlogCard = ({ blogs, index }) => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const { title, _id, short_desc, category, image } = blogs;
  const handleWishlist = () => {
    // console.log("wishlist");
    if (!user?.email) {
      return toast.error("Wishlist not added. Pls! Login First");
    }
    const wishlistBlog = {
      title,
      id: _id,
      short_desc,
      image,
      category,
      user_email: user.email,
    };
    // console.log(wishlistBlog);
    axios
      .post("/post-wishlist", wishlistBlog)
      .then((res) => {
        // console.log(res.data);
        toast.success("Wishlist Added Successfully!");
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Wishlist not added!");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
      }}
    >
      <div className="max-w-full flex flex-col shadow-sm shadow-[#0E7490] pb-6 rounded-xl overflow-hidden h-full">
        <motion.div whileHover={{ scale: 1.1, duration: 2, delay: 0.5 }}>
          <PhotoProvider>
            <PhotoView key={index} src={image ? image : img}>
              <img
                className="h-52 w-full object-cover rounded-t-xl mb-3 cursor-pointer"
                src={image ? image : img}
                alt="blog image"
              />
            </PhotoView>
          </PhotoProvider>
        </motion.div>
        <div className="px-4 space-y-3 mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {short_desc}
          </p>
        </div>
        <div className="mt-auto px-4">
          <p className="font-semibold mb-3">{category}</p>
          <div className="flex justify-between">
            <motion.div whileHover={{ scale: 1.05, opacity: 0.9 }}>
              <Link to={`/blog-details/${_id}`}>
                <Button>Details</Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, opacity: 0.9 }}>
              <Button onClick={handleWishlist}>Add to Wishlist</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
