import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "/logo.png";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, firebaseLogOut } = useContext(AuthContext);
  const goTo = useNavigate();
  // console.log(user);
  const logOut = () => {
    const toastId = toast.loading("Signing out....");
    console.log("logout");
    firebaseLogOut()
      .then(() => {
        toast.success("Sign out successfully!", { id: toastId });
        goTo("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not sign out!", { id: toastId });
      });
  };
  const menus = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#155e75] pb-1" : "pb-1"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/add-blog"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#155e75] pb-1" : "pb-1"
        }
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/all-blogs"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#155e75] pb-1" : "pb-1"
        }
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/features"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#155e75] pb-1" : "pb-1"
        }
      >
        Featured Blogs
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#155e75] pb-1" : "pb-1"
        }
      >
        Wishlist
      </NavLink>
    </>
  );
  return (
    <div>
      <Navbar fluid rounded className="shadow-md shadow-[#60747a] py-4">
        <Link to={"/"} className="flex">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            RS Tech
          </span>
        </Link>
        <div className="flex ml-auto md:ml-0 md:order-2">
          {user ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={user?.photoURL ? user?.photoURL : "/profile.jpg"}
                    rounded
                    bordered
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm mb-2 text-[#155e75]">
                    {user?.displayName ? user?.displayName : "Name not set"}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <Link to={"/login"}>
              <Button>Login/Register</Button>
            </Link>
          )}
        </div>
        <Navbar.Toggle className="ml-3" />
        <Navbar.Collapse>{menus}</Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
