import { Button, Card, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiBackLeft } from "react-icons/tfi";

const Register = () => {
  const goToLogin = useNavigate();
  const { emailPassResister, updateUser, firebaseLogOut } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log(name, email, password, image);

    const passValid =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{6,}$/;
    if (!passValid.test(password)) {
      return toast.error(
        "Your Password at least 6 character, one upper case, a special character and number"
      );
    }
    const toastId = toast.loading("User Creating...");

    emailPassResister(email, password)
      .then((res) => {
        // console.log(res.user);
        if (res) {
          updateUser(name, image)
            .then((res) => {
              toast.success("User Created Successfully!", { id: toastId });
              firebaseLogOut();
              goToLogin("/login");
            })
            .catch((err) => {
              toast.error("Did something wrong!", { id: toastId });
            });
        }
      })
      .catch((err) => {
        // console.log(err);
        const error = err;
        toast.error(`${error}`, { id: toastId });
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
          Pls! Register
        </h3>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Name" />
            </div>
            <TextInput
              type="text"
              name="name"
              placeholder="Type your Name"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Image (Optional)" />
            </div>
            <TextInput
              type="text"
              name="image"
              placeholder="Past Image URL"
              //   required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Email" />
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
          <Button type="submit">Register</Button>
        </form>
        <p>
          Have an account?{" "}
          <Link
            className="text-[#155e75] font-semibold hover:text-blue-500"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
