import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeTodo, deleteGroup } from "../../features/groupSlice";
import { authState } from "../../features/authSlice";
import {
  deleteTodoInGrup,
  getGroup,
  groupState,
} from "../../features/groupSlice";
import { setGroup, setMembers, setModal } from "../../features/themaSlice";
import { changeTodosStatus, deleteTodo } from "../../features/todoSlice";
import "./group.scss";
const Group = () => {
  const { user } = useSelector(authState);
  const { groups } = useSelector(groupState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroup(user._id));
  }, []);

  useEffect(() => {
    accordionSetting();
    return () => {
      accordionSetting();
    };
  }, []);

  const accordionSetting = () => {
    const acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  };

  return (
    <div className="slot max-h-screen bg-purple-50  box-border w-full md:w-2/3 p-5 md:p-2 overflow-y-auto overflow-x-hidden">
      <div className=" w-full flex items-center justify-between  ">
        <h1 className="text-2xl">Gruplar </h1>
        {/* <div className="group cursor-pointer relative flex items-center">
          <i className="bi bi-check2-all text-2xl "></i>
          <span className="inline-block text-sm absolute w-max left-0 transition-all duration-300  opacity-0 group-hover:opacity-100 group-hover:left-[-320%]">
            Hepsini Bitir
          </span>
        </div> */}
      </div>
      <div id="aspect-content">
        {groups.map((group, i) => (
          <React.Fragment key={i}>
            <div className="aspect-tab ">
              <input
                id={group._id}
                type="checkbox"
                className="aspect-input"
                name="aspect"
              />
              <label htmlFor={group._id} className="aspect-label"></label>
              <div className="aspect-content">
                <div className="aspect-info">
                  <div className="chart-pie negative over50">
                    <span className="chart-pie-count">
                      {group.todos.length}{" "}
                    </span>
                    <div>
                      <div className="first-fill"></div>
                      <div
                        className="second-fill"
                        style={{ transform: "rotate(360deg)" }}
                      ></div>
                    </div>
                  </div>
                  <span className="aspect-name">{group.title}</span>
                </div>
                <div className="aspect-stat relative ">
                  <div className="">
                    {group.admin === user._id && (
                      <React.Fragment>
                        <Link
                          className="all-opinions mr-3 p-1 bg-purple-200 rounded-sm  z-10"
                          onClick={() => {
                            dispatch(
                              setGroup({
                                id: group._id,
                                members: group.members,
                              })
                            );
                            dispatch(setModal());
                          }}
                          to="/newtodo"
                        >
                          <span className="">Görev Ekle</span>
                        </Link>
                        <Link
                          onClick={() => {
                            dispatch(setModal());
                            dispatch(setMembers(group.members));
                            dispatch(setGroup(group._id));
                          }}
                          to="/newgroup"
                          className="all-opinions mr-3 p-1 bg-purple-200 rounded-sm "
                        >
                          <span>Üye Ekle</span>
                        </Link>
                        <span
                          className="all-opinions mr-3 p-1 bg-purple-200 rounded-sm "
                          onClick={() => dispatch(deleteGroup(group._id))}
                        >
                          <span>Grubu sil</span>
                        </span>
                      </React.Fragment>
                    )}
                  </div>

                  <div className="all-opinions">
                    <span className="all-opinions-count">
                      {group.members.length}
                    </span>
                    <span>Üye</span>
                  </div>
                </div>
              </div>
              <div className="aspect-tab-content">
                <div className="sentiment-wrapper">
                  {group.todos.map((todo, i) => (
                    <div className="flex flex-col" key={i}>
                      <div
                        className={`${
                          todo.status ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        <div className="opinion-header flex justify-between">
                          <span>{todo.user.name}</span>
                          <small>
                            {moment(todo.deadline).add("days").calendar()}
                          </small>
                        </div>
                        <div>
                          <span>{todo.todo}</span>
                        </div>
                        <div className="opinion-header p-0 m-0 h-0 py-2 flex justify-end">
                          {todo.user._id === user._id && (
                            <span
                              onClick={() => {
                                dispatch(changeTodosStatus(todo._id));
                                dispatch(
                                  changeTodo({
                                    group: group._id,
                                    todo: todo._id,
                                  })
                                );
                              }}
                            >
                              {todo.status ? (
                                <i className="bi bi-arrow-counterclockwise text-purple-300 cursor-pointer "></i>
                              ) : (
                                <i className="bi bi-check-lg text-purple-300 cursor-pointer "></i>
                              )}
                            </span>
                          )}
                          {group.admin === user._id && (
                            <i
                              onClick={() => {
                                dispatch(deleteTodo(todo._id));
                                dispatch(
                                  deleteTodoInGrup({
                                    group: group._id,
                                    todo: todo._id,
                                  })
                                );
                              }}
                              className="bi bi-trash block z-50 text-purple-300 cursor-pointer"
                            ></i>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Group;
