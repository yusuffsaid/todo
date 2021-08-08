import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setModal, themaState } from "../../features/themaSlice";
const ModalTemplate = (props) => {
  const { modal } = useSelector(themaState);
  useEffect(() => {
    if (!modal) {
      props.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);
  const dispatch = useDispatch();
  // window.onclick = (e) => {
  //   if (e.target.matches("#ysf-modal")) dispatch(setModal());
  // };
  window.onkeyup = (e) => {
    if (e.keyCode === 27) dispatch(setModal(false));
  };
  return (
    <div
      id="ysf-modal"
      className={`${
        modal ? "left-0" : "-left-full "
      } w-screen h-screen absolute top-0 flex justify-center z-50 bg-gray-500 bg-opacity-90 `}
    >
      <span
        onClick={() => dispatch(setModal(false))}
        className="group absolute top-5 right-5 transition-all duration-500 p-2 w-10 h-10 flex items-center justify-center hover:bg-white hover:rounded-full"
      >
        <i className="group-hover:rotate-90 bi bi-x-lg transition-all duration-300 text-3xl text-white md:text-purple-500"></i>
      </span>
      {props.children}
    </div>
  );
};

export default withRouter(ModalTemplate);
