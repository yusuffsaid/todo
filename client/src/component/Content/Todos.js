import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../../features/authSlice";
import {
  changeTodosStatus,
  deleteTodo,
  getTodos,
  todoState,
} from "../../features/todoSlice";
import moment from "moment";
const Todos = () => {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector(todoState);
  const { user } = useSelector(authState);
  useEffect(() => {
    dispatch(getTodos(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return (
      <div className="h-full w-1/3 flex items-center justify-center">
        <span className="w-20 h-20 rounded-full bg-purple-500 animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="slot inline-block max-h-screen  box-border w-full md:w-1/3 p-5 md:p-2 overflow-y-auto overflow-x-hidden">
      <div className=" w-full flex items-center justify-between mb-1">
        <h1 className="text-2xl">Görevler</h1>
        <div className="group cursor-pointer relative flex items-center">
          <i className="bi bi-check2-all text-2xl "></i>
          <span className="inline-block text-sm absolute w-max left-0 transition-all duration-300  opacity-0 group-hover:opacity-100 group-hover:left-[-320%]">
            Hepsini Bitir
          </span>
        </div>
      </div>
      <div className="py-2 flex">
        <div className="flex items-center cursor-pointer">
          <span className="w-3 h-3 block rounded-full bg-green-100 mr-1"></span>
          <small>Yapılan Görevler</small>
        </div>
        <div className="flex items-center ml-3 cursor-pointer">
          <span className="w-3 h-3 block rounded-full bg-red-100 mr-1"></span>
          <small>Bekleyen Görevler</small>
        </div>
      </div>
      {todos.map((todo, i) => (
        <div
          onDoubleClick={() => dispatch(changeTodosStatus(todo._id))}
          key={i}
          className={`${
            todo.status
              ? "border-green-400 bg-green-100"
              : "border-red-400 bg-red-100"
          }group hover:bg-opacity-60 w-full  relative flex flex-col overflow-hidden shadow-md mb-3 border-2 rounded-md  p-1`}
        >
          <div className=" w-full flex flex-col text-justify  ">
            <div className="flex items-center py-2">
              <p
                className={`${
                  todo.status && "line-through"
                } w-full leading-tight`}
              >
                {todo.todo}
              </p>
            </div>
            <div className="my-1 flex items-center justify-between">
              <small className="text-gray-500">
                {/* moment(todo.donedate).startOf().fromNow() */}
                Son: {moment(todo.deadline).add("days").calendar()}
                {todo.group && " ~ " + todo.group.title}
              </small>
              <div className="flex  items-center">
                <span onClick={() => dispatch(changeTodosStatus(todo._id))}>
                  {todo.status ? (
                    <i className="bi bi-arrow-counterclockwise text-purple-300 cursor-pointer "></i>
                  ) : (
                    <i className="bi bi-check-lg text-purple-300 cursor-pointer "></i>
                  )}
                </span>

                {todo.user._id === todo.adding && (
                  <i
                    onClick={() => dispatch(deleteTodo(todo._id))}
                    className="ml-2 bi bi-trash block z-50 text-purple-300 cursor-pointer"
                  ></i>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
