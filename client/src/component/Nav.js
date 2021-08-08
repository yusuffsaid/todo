import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setGroup, setMembers, setModal } from "../features/themaSlice";
import nav from "./_nav";
const Nav = ({ where }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex flex-col flex-1">
        {nav.map((m, i) => (
          <Link
            onClick={() => {
              dispatch(setGroup(false));
              dispatch(setMembers(false));
              dispatch(setModal());
            }}
            key={i}
            className="flex w-full items-center justify-center h-16 hover:bg-purple-300 relative group z-30"
            to={m.to}
          >
            <i className={m.icon + " text-2xl text-white "}></i>
            {where === "nav" ? (
              <span className=" p-1 text-white -left-full w-20 ml-2">
                {m.title}
              </span>
            ) : (
              <span className=" p-1 bg-black rounded-md text-white absolute -left-full w-20 transition-all duration-200 opacity-0  group-hover:left-[105%] group-hover:opacity-100 ">
                {m.title}
              </span>
            )}

            <span className=" p-1 bg-black rounded-md text-white absolute -left-full w-20 transition-all duration-200 opacity-0  group-hover:left-[105%] group-hover:opacity-100 ">
              {m.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;
