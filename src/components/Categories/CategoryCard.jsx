import { motion } from "framer-motion";

const CategoryCard = ({ item }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="border py-4 px-3 font-medium shadow-sm shadow-blue-400 animate-pulse">
        <h3>{item.category}</h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
