import { useContext } from "react";
import profile from "/profile.jpg";
import { AuthContext } from "../../Providers/AuthProviders";

const BlogComments = ({ comment }) => {
  const { user_name, comment: user_comment, user_img } = comment;
  return (
    <div className="shadow-sm shadow-[#155e75] py-3 px-4 mb-4  flex gap-7 max-w-xl mx-auto">
      <img
        src={user_img ? user_img : profile}
        alt="comment image"
        className="h-12 w-12 rounded-full border border-[#155e75]"
      />
      <div className="">
        <p className="font-semibold text-lg">
          {user_name ? user_name : "Anonymous User"}
        </p>
        <p>{user_comment}</p>
      </div>
    </div>
  );
};

export default BlogComments;
