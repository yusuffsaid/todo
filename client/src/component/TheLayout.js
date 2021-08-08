import React from "react";
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";
import TheContent from "./TheContent";
import "./style.css";
import Modal from "./modals/Modal";
const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
          <Modal />
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
};

export default TheLayout;
