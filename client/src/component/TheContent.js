import React from "react";
import Group from "./Content/Group";
import Todos from "./Content/Todos";

const TheContent = () => {
  return (
    <main className="c-main  box-border float-right flex flex-col md:flex-row">
      <Todos></Todos>
      <Group></Group>
    </main>
  );
};

export default TheContent;
