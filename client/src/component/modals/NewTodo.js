import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { newTodo } from "../../features/todoSlice";
import { setModal, themaState } from "../../features/themaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addTodoForGroup } from "../../features/groupSlice";
import { authState } from "../../features/authSlice";

const NewTodo = () => {
  const { user } = useSelector(authState);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { group } = useSelector(themaState);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newTodo({
        ...data,
        adding: user._id,
        user: data.user || user._id,
      })
    )
      .then(unwrapResult)
      .then((data) => {
        if (data.group !== undefined) {
          dispatch(addTodoForGroup(data));
        }
      });
    dispatch(setModal());
  };

  useEffect(() => {
    group !== false && setData({ group: group.id });
    return () => {};
  }, []);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  return (
    <div
      style={{ height: "max-content" }}
      className="w-full  mt-20  md:w-6/12 bg-white flex justify-center py-6 m-1 rounded-sm shadow-2xl"
    >
      <form onSubmit={onSubmit} className="w-full md:w-6/12 px-2">
        <div className="mb-4">
          <p className=" inline-block text-lg">Todo</p>

          <textarea
            onChange={changeHandler}
            name="todo"
            className="w-full border-2 border-purple-500 focus:outline-none h-20 p-1 rounded-sm"
          ></textarea>
        </div>

        {group !== false && (
          <div className="mb-4">
            <p className="inline-block text-lg">Kime</p>

            <select
              onChange={changeHandler}
              className="w-full border-2 border-purple-500 p-1 focus:outline-none block rounded-sm"
              name="user"
            >
              <option></option>
              {group.members.map((member, i) => (
                <option key={i} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <p className="inline-block text-lg">Bitiş</p>

          <input
            onChange={changeHandler}
            className="w-full border-2 border-purple-500 p-1 focus:outline-none block rounded-sm"
            type="datetime-local"
            name="deadline"
          ></input>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 py-3 text-white rounded-sm"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
