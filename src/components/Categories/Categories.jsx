import useCategoriesApi from "../../hooks/useCategoriesApi";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const category = useCategoriesApi();
  return (
    <div className="mb-10">
      <h2 className="text-center border-b-2 pb-2 font-semibold text-3xl text-[#155E75]">
        BLOG CATEGORIES
      </h2>
      <div className="flex flex-wrap gap-4 justify-center mt-4 overflow-hidden">
        {category?.data?.map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
