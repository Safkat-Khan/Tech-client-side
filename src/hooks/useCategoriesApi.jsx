import { useQuery } from "@tanstack/react-query";
import SkeletonLoading from "../pages/Loadings/SkeletonLoading";
import useAxios from "./useAxios";

const useCategoriesApi = () => {
  const axios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["categoryAPI"],
    queryFn: () => {
      return axios.get("/categories");
    },
  });
  if (isPending) {
    return <SkeletonLoading />;
  }
  if (error) {
    return <p>Data not loaded!</p>;
  }
  return data;
};

export default useCategoriesApi;
