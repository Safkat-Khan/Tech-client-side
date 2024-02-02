import { Carousel } from "flowbite-react";
import banner01 from "/banner01.jpg";
import banner02 from "/banner02.jpg";
import banner03 from "/banner03.jpg";

const Banner = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-[500px] mt-3">
      <Carousel pauseOnHover>
        <img src={banner01} alt="..." />
        <img src={banner02} alt="..." />
        <img src={banner03} alt="..." />
      </Carousel>
    </div>
  );
};

export default Banner;
