import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = () => {
  return (
    <div>
      <Skeleton count={20}></Skeleton>
    </div>
  );
};

export default SkeletonLoading;
