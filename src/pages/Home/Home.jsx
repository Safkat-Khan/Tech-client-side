import Categories from "../../components/Categories/Categories";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Photography from "../../components/Photography/Photography";
import RecentBlog from "../../components/RecentBlog/RecentBlog";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <RecentBlog></RecentBlog>
      <Categories />
      <Photography />
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
