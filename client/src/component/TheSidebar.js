import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Nav from "./Nav";
const TheSidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="bg-purple-600 w-16 hidden md:flex flex-col pt-16 shadow-2xl z-10">
      <div className="flex-1">
        <Nav></Nav>
      </div>

      <div
        onClick={() => dispatch(logout())}
        className="top-0 cursor-pointer flex items-center justify-center h-16 hover:bg-purple-300 relative group z-30"
      >
        <i className="bi bi-door-open text-2xl text-white"></i>
        <span className=" p-1 bg-black rounded-md text-white absolute -left-full w-20 transition-all duration-200 opacity-0  group-hover:left-[105%] group-hover:opacity-100 ">
          Çıkış yap
        </span>
      </div>
    </div>
  );
};

export default TheSidebar;
