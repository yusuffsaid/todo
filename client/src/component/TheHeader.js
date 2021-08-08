import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState, logout } from "../features/authSlice";
import Nav from "./Nav";

const TheHeader = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  // const { user } = useSelector(authState);
  return (
    <div className="relative bg-purple-600  shadow-lg h-16 md:hidden flex items-center justify-between px-3 ">
      <i
        className="bi bi-list text-2xl text-white"
        onClick={() => setMenu(true)}
      ></i>
      <i
        onClick={() => dispatch(logout())}
        className="bi bi-arrow-right-square text-2xl text-white"
      ></i>

      <div
        className={`${
          !menu ? "-left-full" : "left-0"
        } top-0  absolute w-screen h-screen bg-purple-500 z-20 transition-all duration-300`}
      >
        <div
          className=" flex items-center justify-center h-full"
          onClick={() => setMenu(false)}
        >
          <Nav where="nav"></Nav>
        </div>
        <span
          onClick={() => setMenu(false)}
          className="z-50 absolute top-5 right-3 transition-all duration-500  w-10 h-10 flex items-center justify-center "
        >
          <i className=" bi bi-x-lg transition-all duration-300 text-2xl text-white"></i>
        </span>{" "}
      </div>
    </div>
  );
};

export default TheHeader;
