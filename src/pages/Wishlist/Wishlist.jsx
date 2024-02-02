import { useQuery } from "@tanstack/react-query";
import WishlistCard from "./WishlistCard";
import SkeletonLoading from "../Loadings/SkeletonLoading";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxios from "../../hooks/useAxios";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const ownerEmail = user?.email;
  const axios = useAxios();
  const getWishlist = async () => {
    const res = await axios.get(`/wishlist-by-user/${ownerEmail}`);
    return res;
  };
  const { isLoading, isFetching, isError, data, refetch } = useQuery({
    queryKey: ["wishlist-by-user"],
    queryFn: getWishlist,
  });

  if (isError) {
    return <p>data not found</p>;
  }
  // console.log(data?.data);
  return (
    <div>
      <h2 className="my-4 text-2xl font-semibold bg-[#155e75] w-full py-4 text-white text-center rounded-lg">
        Your Wishlist
      </h2>
      {data?.data == 0 ? (
        <h3 className="text-3xl py-9 w-full flex items-center justify-center font-semibold text-gray-400 min-h-[500px]">
          Wishlist is empty!
        </h3>
      ) : isFetching ? (
        <SkeletonLoading />
      ) : isLoading ? (
        <SkeletonLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-4">
          {data?.data.map((wishlist) => (
            <WishlistCard
              key={wishlist._id}
              wishlist={wishlist}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
