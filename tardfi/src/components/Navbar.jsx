import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  //   const truncateAddress = (address) => {
  //     if (!address) return "";
  //     return `${address.substring(0, 6)}...${address.slice(-4)}`;
  //   };
  return (
    <div className="w-full fixed h-12 md:h-16 flex shadow items-center bg-[#030710]">
      <div className="layout flex items-center justify-between">
        <Link to="/" className=" text-white  text-xl sm:text-2xl lg:text-3xl">
          PetraX
        </Link>
        <div className="hidden text-white md:flex items-center gap-x-6 bg-gray-900 rounded-3xl py-2 px-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/market-place">Marketplace</NavLink>
          <NavLink to="/">Buy</NavLink>
          <NavLink to="/">Sell</NavLink>
        </div>
        <div className="hidden md:flex items-center md:gap-x-8 lg:gap-x-12">
          <button className="custom-gradient text-white font-semibold rounded-full px-4 py-2">
            Connect Wallet
          </button>
        </div>
        <div
          className="block md:hidden text-white"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <IoMdClose className="size-8" />
          ) : (
            <IoMenuOutline className="size-8" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
