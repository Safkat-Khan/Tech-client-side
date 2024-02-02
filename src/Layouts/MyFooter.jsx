import { Footer } from "flowbite-react";
import logo from "/logo.png";
const MyFooter = () => {
  return (
    <Footer container className="shadow-md shadow-[#60747a] ">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand href="#" src={logo} alt="Logo" name="RS Tech" />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="RS Tech™" year={2023} />
      </div>
    </Footer>
  );
};

export default MyFooter;
