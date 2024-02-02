import { Carousel } from "flowbite-react";
import img01 from "/photography01.jpeg";
import img02 from "/photography02.jpeg";
import img03 from "/photography03.jpg";
import img04 from "/photography04.jpeg";
import { motion } from "framer-motion";

const Photography = () => {
  return (
    <div className="mb-10">
      <h2 className="text-center border-b-2 pb-2 font-semibold text-3xl text-[#155E75]">
        PHOTOGRAPHY
      </h2>
      <div className="grid h-[500px] md:h-80 grid-cols-1 md:grid-cols-2 gap-4 mt-8 overflow-hidden">
        <motion.div
          initial={{
            translateX: -300,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          whileInView={{
            translateX: 0,
            opacity: 1,
          }}
        >
          <Carousel indicators={false} leftControl=" " rightControl=" ">
            <img
              className="w-full h-full rounded-xl"
              src={img01}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img02}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img03}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img04}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img02}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img01}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img04}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img03}
              alt="photography img"
            />
          </Carousel>
        </motion.div>
        <motion.div
          initial={{
            translateX: 300,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          whileInView={{
            translateX: 0,
            opacity: 1,
          }}
        >
          <Carousel indicators={false} leftControl=" " rightControl=" ">
            <img
              className="w-full h-full rounded-xl"
              src={img01}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img02}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img03}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img04}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img02}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img01}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img04}
              alt="photography img"
            />
            <img
              className="w-full h-full rounded-xl"
              src={img03}
              alt="photography img"
            />
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default Photography;
