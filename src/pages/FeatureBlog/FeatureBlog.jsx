import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import SkeletonLoading from "../Loadings/SkeletonLoading";
import { StyleSheetManager } from "styled-components";
import useAxios from "../../hooks/useAxios";

const FeatureBlog = () => {
  const axios = useAxios();
  const getFeatures = async () => {
    const res = await axios.get("/top-ten-features");
    return res;
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["top-ten-post"],
    queryFn: getFeatures,
  });
  if (isPending) {
    return <SkeletonLoading />;
  }
  // console.log(data?.data);
  const filterData = data?.data.sort(
    (a, b) => b.long_desc.length - a.long_desc.length
  );
  const topTen = filterData?.slice(0, 10);
  // console.log(topTen);
  const customStyles = {
    headCells: {
      style: {
        border: "1px solid gray",
        borderBottom: "none",
        backgroundColor: "#155e75",
        color: "white",
        fontSize: "17px",
      },
    },
    cells: {
      style: {
        border: "1px solid gray",
        borderBottom: "none",
        padding: "5px 10px",
      },
    },
  };
  const columns = [
    {
      name: "SL No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },

    {
      name: "Long Desc Length",
      selector: (row) => row.long_desc.length,
    },
    {
      name: "Owner",
      selector: (row) => row.user_name,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="rounded-full h-16 w-16" src={row.user_img} />
      ),
    },
  ];
  const loadedData = [...topTen];
  return (
    <div className="my-10 border">
      <StyleSheetManager
        shouldForwardProp={(prop) => !prop.startsWith("sortActive")}
      >
        <DataTable
          columns={columns}
          data={loadedData}
          customStyles={customStyles}
        />
      </StyleSheetManager>
    </div>
  );
};

export default FeatureBlog;
