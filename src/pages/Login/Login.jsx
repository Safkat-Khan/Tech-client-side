import { Button, Card, Label, TextInput, Toast } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiBackLeft } from "react-icons/tfi";

const Login = () => {
  const [show, setShow] = useState(false);
  const goTo = useNavigate();
  const { emailPassLogin, googleLogin } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    const toastId = toast.loading("Logging..");
    emailPassLogin(email, password)
      .then((res) => {
        // console.log(res.user);
        toast.success("Logged in successfully", { id: toastId });
        goTo("/");
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Email/Password invalid", { id: toastId });
      });
  };
  const googleLoginHandler = () => {
    console.log("google");
    const toastId = toast.loading("Logging..");
    googleLogin()
      .then((res) => {
        // console.log(res.user);

        toast.success("Logged in successfully", { id: toastId });

        goTo("/");
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Email/Password invalid", { id: toastId });
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[1200px] mx-auto">
      <h2 className="my-4 text-2xl font-semibold bg-[#155e75] w-full py-4 text-white text-center rounded-lg">
        Welcome to RS Blog
      </h2>
      <Card className="w-80 border border-[#155e75] relative">
        <div className="absolute top-2 right-0 text-2xl font-extrabold p-3 animate-bounce">
          <Link to="/">
            <TfiBackLeft />
          </Link>
        </div>
        <h3 className="text-[#155e75] w-full py-2 text-center  font-semibold rounded-lg text-2xl border-b-2">
          Pls! Login
        </h3>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Your email" />
            </div>
            <TextInput
              type="email"
              name="email"
              placeholder="Type your mail"
              required
            />
          </div>
          <div className="relative">
            <div className="mb-2 block">
              <Label value="Password" />
            </div>
            <TextInput
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              // required
            />
            <div
              onClick={() => setShow(!show)}
              className="absolute right-4 top-11 text-xl text-[#155e75] cursor-pointer"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="flex items-center gap-2"></div>
          <Button type="submit">Login</Button>
        </form>
        <p>
          New here?{" "}
          <Link
            className="text-[#155e75] font-semibold hover:text-blue-500"
            to={"/register"}
          >
            Register
          </Link>
        </p>
        <Button
          onClick={googleLoginHandler}
          className="border border-[#155E75]"
          color="none"
        >
          <FcGoogle className="text-xl mr-2" /> Login With Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
