import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-red-600 font-semibold text-4xl">Oops!</h2>
      <h3 className="text-3xl font-semibold text-gray-400 my-4 max-w-md text-center leading-snug">
        WE ARE SORRY, PAGE NOT FOUND!
      </h3>
      <Link to={"/"}>
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
